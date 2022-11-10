import renderer from "react-test-renderer";
import { ReactElement } from "react";

export const validateRender = (component: ReactElement) => {
  const instance = renderer.create(component);
  // @ts-ignore
  expect(instance.toJSON()).toMatchSnapshot();
};
