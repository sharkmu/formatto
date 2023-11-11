import { debounce, Notice, PluginSettingTab, Setting } from "obsidian";

import type { App } from "obsidian";
import type MainPlugin from "../main";

export class MainPluginSettingTab extends PluginSettingTab {
    plugin: MainPlugin;

    constructor(app: App, plugin: MainPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const { containerEl } = this;
        containerEl.empty();

        // Settings Header
        containerEl.createEl("h1", { text: "Formatto" });
        containerEl
            .createEl("span", { text: "Obsidian Formatter by " })
            .createEl("a", {
                text: "Deca",
                href: "https://github.com/decaplanet",
            });
        containerEl.createEl("span", { text: ".\n" });
        containerEl.createEl("p", {
            text: "All values should be at least 0.",
            cls: "formatto__paragraph-margin formatto__important",
        });

        containerEl.createEl("div", { cls: "formatto__vertical-gap" });

        const debounceMsg = debounce(
            (text: string, value: string) => {
                if (
                    value !== "" &&
                    (isNaN(parseInt(value)) || parseInt(value) < 0)
                ) {
                    new Notice(text);
                }
            },
            1000,
            true
        );

        // Heading Gaps
        containerEl.createEl("h2", {
            text: "Heading Gaps",
        });
        new Setting(containerEl)
            .setName("Top Level Headings")
            .setDesc("Decides gaps between highest level of headings.")
            .addText((text) =>
                text
                    .setPlaceholder("3")
                    .setValue(this.plugin.settings.headingGaps.topLevelHeadings)
                    .onChange(async (value) => {
                        if (
                            value !== "" &&
                            (isNaN(parseInt(value)) || parseInt(value) < 0)
                        ) {
                            debounceMsg(
                                "Please enter a valid number.\nIt should be at least 0.",
                                value
                            );
                        }

                        this.plugin.settings.headingGaps.topLevelHeadings =
                            value;
                        await this.plugin.saveSettings();
                    })
            );
        new Setting(containerEl)
            .setName("First Sub Heading")
            .setDesc(
                "Decides the gap between a parent heading and the first of its children headings."
            )
            .addText((text) =>
                text
                    .setPlaceholder("1")
                    .setValue(this.plugin.settings.headingGaps.firstSubHeading)
                    .onChange(async (value) => {
                        if (
                            value !== "" &&
                            (isNaN(parseInt(value)) || parseInt(value) < 0)
                        ) {
                            debounceMsg(
                                "Please enter a valid number.\nIt should be at least 0.",
                                value
                            );
                        }

                        this.plugin.settings.headingGaps.firstSubHeading =
                            value;
                        await this.plugin.saveSettings();
                    })
            );

        new Setting(containerEl)
            .setName("Sub Headings")
            .setDesc(
                "Decides gaps between headings that are not the highest level."
            )
            .addText((text) =>
                text
                    .setPlaceholder("2")
                    .setValue(this.plugin.settings.headingGaps.subHeadings)
                    .onChange(async (value) => {
                        if (
                            value !== "" &&
                            (isNaN(parseInt(value)) || parseInt(value) < 0)
                        ) {
                            debounceMsg(
                                "Please enter a valid number.\nIt should be at least 0.",
                                value
                            );
                        }

                        this.plugin.settings.headingGaps.subHeadings = value;
                        await this.plugin.saveSettings();
                    })
            );

        // Other Gaps
        containerEl.createEl("h2", {
            text: "Other Gaps",
        });
        new Setting(containerEl)
            .setName("After Properties")
            .setDesc("Decides the gap after YAML properties.")
            .addText((text) =>
                text
                    .setPlaceholder("2")
                    .setValue(this.plugin.settings.otherGaps.afterProperties)
                    .onChange(async (value) => {
                        if (
                            value !== "" &&
                            (isNaN(parseInt(value)) || parseInt(value) < 0)
                        ) {
                            debounceMsg(
                                "Please enter a valid number.\nIt should be at least 0.",
                                value
                            );
                        }

                        this.plugin.settings.otherGaps.afterProperties = value;
                        await this.plugin.saveSettings();
                    })
            );
        new Setting(containerEl)
            .setName("Contents After Headings")
            .setDesc("Decides the gap after a heading.")
            .addText((text) =>
                text
                    .setPlaceholder("0")
                    .setValue(
                        this.plugin.settings.otherGaps.contentsAfterHeadings
                    )
                    .onChange(async (value) => {
                        if (
                            value !== "" &&
                            (isNaN(parseInt(value)) || parseInt(value) < 0)
                        ) {
                            debounceMsg(
                                "Please enter a valid number.\nIt should be at least 0.",
                                value
                            );
                        }

                        this.plugin.settings.otherGaps.contentsAfterHeadings =
                            value;
                        await this.plugin.saveSettings();
                    })
            );
        new Setting(containerEl)
            .setName("Code Blocks")
            .setDesc("Decides the gap before a code block.")
            .addText((text) =>
                text
                    .setPlaceholder("0")
                    .setValue(
                        this.plugin.settings.otherGaps.contentsAfterHeadings
                    )
                    .onChange(async (value) => {
                        if (
                            value !== "" &&
                            (isNaN(parseInt(value)) || parseInt(value) < 0)
                        ) {
                            debounceMsg(
                                "Please enter a valid number.\nIt should be at least 0.",
                                value
                            );
                        }

                        this.plugin.settings.otherGaps.contentsAfterHeadings =
                            value;
                        await this.plugin.saveSettings();
                    })
            );
        new Setting(containerEl)
            .setName("Code Blocks After Headings")
            .setDesc(
                "Decides the gap before a code block when the code block is right after a heading."
            )
            .addText((text) =>
                text
                    .setPlaceholder("0")
                    .setValue(
                        this.plugin.settings.otherGaps.codeBlocksAfterHeadings
                    )
                    .onChange(async (value) => {
                        if (
                            value !== "" &&
                            (isNaN(parseInt(value)) || parseInt(value) < 0)
                        ) {
                            debounceMsg(
                                "Please enter a valid number.\nIt should be at least 0.",
                                value
                            );
                        }

                        this.plugin.settings.otherGaps.codeBlocksAfterHeadings =
                            value;
                        await this.plugin.saveSettings();
                    })
            );
    }
}
