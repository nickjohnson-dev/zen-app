import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs";
import { SlotsBasics } from "./slots-basics.story";

storiesOf("Slots", module)
  .addDecorator(withKnobs)
  .add("Basics", () => <SlotsBasics />);
