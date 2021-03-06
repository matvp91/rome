/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {test} from "rome";

import {testLintMultiple} from "../testHelpers";

test(
	"disallow children with dangerouslySetInnerHTML",
	async (t) => {
		await testLintMultiple(
			t,
			[
				// INVALID
				'<div dangerouslySetInnerHTML={{ __html: "HTML" }}>children</div>',
				'<div dangerouslySetInnerHTML={{ __html: "HTML" }} children={"children"} />',
				'<div dangerouslySetInnerHTML={{ __html: "HTML" }} children={["children"]} />',
				'<Invalid dangerouslySetInnerHTML={{ __html: "HTML" }}>children</Invalid>',
				'<Invalid dangerouslySetInnerHTML={{ __html: "HTML" }} children={"children"}/>',
				'React.createElement("div", { dangerouslySetInnerHTML: { __html: "HTML" } }, "children")',
				'React.createElement("div", { dangerouslySetInnerHTML: { __html: "HTML" } }, ["children"])',
				'React.createElement("div", { dangerouslySetInnerHTML: { __html: "HTML" }, children: "children" })',
				'React.createElement("div", { dangerouslySetInnerHTML: { __html: "HTML" }, children: ["children"] })',
				'React.createElement("Invalid", { dangerouslySetInnerHTML: { __html: "HTML" }, children: "children" })',
				'React.createElement("Invalid", { dangerouslySetInnerHTML: { __html: "HTML" }, children: ["children"] })',
				'React.createElement("Invalid", { dangerouslySetInnerHTML: { __html: "HTML" } }, "children")',
				'React.createElement("Invalid", { dangerouslySetInnerHTML: { __html: "HTML" } }, ["children"])',
				// VALID
				'<div dangerouslySetInnerHTML={{ __html: "HTML" }} />',
				"<div>children</div>",
				'<div children={"children"} />',
				'<div children={["children"]} />',
				'<Valid dangerouslySetInnerHTML={{ __html: "HTML" }} />',
				"<Valid>children</Valid>",
				'<Valid children={"children"} />',
				'<Valid children={["children"]} />',
				'React.createElement("div", { dangerouslySetInnerHTML: { __html: "HTML" } })',
				'React.createElement("div", {}, "children")',
				'React.createElement("div", {}, ["children"])',
				'React.createElement("div", { children: "children" })',
				'React.createElement("div", { children: ["children"] })',
				'React.createElement("Valid", { dangerouslySetInnerHTML: { __html: "HTML" } })',
				'React.createElement("Valid", {}, "children")',
				'React.createElement("Valid", {}, ["children"])',
				'React.createElement("Valid", { children: "children" })',
				'React.createElement("Valid", { children: ["children"] })',
			],
			{category: "lint/react/noDangerWithChildren"},
		);
	},
);
