import { getData, storeData } from "../../storage"

const ONE_MINUTE = 60 * 1000
const baseUrl = process.env.PMO_API

type QueryParams = Partial<Record<string, string | null | undefined>>

export interface LocalStorageApiRequest<T> {
  data: T
  dateTime: number
}

export const keyPrefix = "apiRequest-"

export async function apiRequest<
  Data = never,
  Params extends QueryParams = QueryParams,
  Body = unknown,
>({
  method,
  params,
  path,
  body,
}: {
  method: string
  params?: Params
  path: string
  body?: Body
}): Promise<{ data: Data | null; error: Error | null }> {
  try {
    const requestUrl = `${baseUrl}${path}${stringifyQuery(params)}`

    try {
      const cachedResponse = await getData<LocalStorageApiRequest<Data>>(
        keyPrefix + requestUrl,
      )

      if (cachedResponse) {
        const age = Date.now() - cachedResponse.dateTime
        if (age < ONE_MINUTE) {
          return {
            data: cachedResponse.data,
            error: null,
          }
        }
      }
    } catch (error) {
      console.error("Failed to get cached value:", error)
    }

    const response = await fetch(requestUrl, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    })

    const data = await response.json()
    const error = response.ok
      ? null
      : new Error(`${response.status} (${response.statusText})`)

    if (method === "GET" && response.ok) {
      storeData<LocalStorageApiRequest<Data>>(keyPrefix + requestUrl, {
        data: data,
        dateTime: Date.now(),
      })
    }

    return {
      data: data,
      error: error,
    }
  } catch (error) {
    return {
      data: null,
      error:
        error instanceof Error ? error : new Error("An unknown error occurred"),
    }
  }
}

export function stringifyQuery(input: QueryParams = {}): string {
  const output: string[] = []

  for (const [key, value] of Object.entries(input)) {
    if (typeof value !== "undefined" && value !== null) {
      output.push(`${key}=${value}`)
    }
  }

  return output ? `?${output.join("&")}` : ""
}
