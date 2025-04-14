import { render, screen, userEvent } from "@testing-library/react-native"

import FormTextField from "./FormTextField"

describe("FormTextField component", () => {
  it("renders label", async () => {
    const handleChangeMock = jest.fn()

    render(
      <FormTextField
        label="Hello!"
        value="response"
        onChange={handleChangeMock}
      ></FormTextField>,
    )

    const user = userEvent.setup()
    expect(screen.getByText(/Hello/)).toBeTruthy()

    await user.type(screen.getByLabelText(/Hello/i), "test")

    expect(handleChangeMock).toHaveBeenCalledTimes(4)
    expect(handleChangeMock).toHaveBeenNthCalledWith(1, "responset")
    expect(handleChangeMock).toHaveBeenNthCalledWith(2, "responsee")
    expect(handleChangeMock).toHaveBeenNthCalledWith(3, "responses")
    expect(handleChangeMock).toHaveBeenNthCalledWith(4, "responset")
  })
})
