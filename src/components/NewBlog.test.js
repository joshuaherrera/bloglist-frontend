import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import NewBlog from "./NewBlog";

describe("<NewBlog />", () => {
  test("Call event handler and check contents", () => {
    const addBlog = jest.fn();

    const component = render(<NewBlog addBlog={addBlog} />);

    const title = component.container.querySelector("#title");
    const author = component.container.querySelector("#author");
    const url = component.container.querySelector("#url");

    const form = component.container.querySelector("form");

    fireEvent.change(title, {
      target: {
        value: "New Title",
      },
    });

    fireEvent.change(author, {
      target: {
        value: "New Author",
      },
    });

    fireEvent.change(url, {
      target: {
        value: "New url",
      },
    });

    fireEvent.submit(form);

    expect(addBlog.mock.calls).toHaveLength(1);
    // console.log(addBlog.mock.calls[0][0]);
    expect(addBlog.mock.calls[0][0].title).toBe("New Title");
    expect(addBlog.mock.calls[0][0].author).toBe("New Author");
    expect(addBlog.mock.calls[0][0].url).toBe("New url");
  });
});
