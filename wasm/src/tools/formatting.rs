use std::error::Error;

use crate::setting_schema::{MainPluginSettings, DefaultPluginSettings};
use crate::tools::{
    parsing::parse_str_to_usize,
    tokens::{HeadingLevel, MarkdownSection},
};

/// Return a String value that is replacing the entire document.
pub fn get_formatted_string(
    sections: Vec<MarkdownSection>,
    main_settings: &MainPluginSettings,
    default_settings: &DefaultPluginSettings,
) -> Result<String, Box<dyn Error>> {
    let mut output = String::new();

    let mut right_after_properties = false;
    let mut right_after_heading = false;
    let mut right_after_code_block = false;

    for section in sections {
        match section {
            MarkdownSection::Property(content) => {
                output.push_str(&content);

                right_after_properties = true;
                right_after_heading = false;
                right_after_code_block = false;
            }
            MarkdownSection::Heading(heading_level) => {
                match heading_level {
                    HeadingLevel::Top(content) => {
                        output.push_str(&insert_line_breaks(
                            &content,
                            if output.is_empty() {
                                0
                            } else if right_after_properties {
                                parse_str_to_usize(&main_settings.other_gaps.after_properties, &default_settings.other_gaps.after_properties,)? + 1
                            } else {
                                parse_str_to_usize(
                                    &main_settings.heading_gaps.before_top_level_headings, &default_settings.heading_gaps.before_top_level_headings
                                )? + 1
                            },
                            0,
                        ));
                    }
                    HeadingLevel::FirstSub(content) => {
                        let formatted = insert_line_breaks(
                            &content,
                            if output.is_empty() {
                                0
                            } else if right_after_properties {
                                parse_str_to_usize(&main_settings.other_gaps.after_properties, &default_settings.other_gaps.after_properties)? + 1
                            } else {
                                parse_str_to_usize(&main_settings.heading_gaps.before_first_sub_heading, &default_settings.heading_gaps.before_first_sub_heading)?
                                    + 1
                            },
                            0,
                        );
                        output.push_str(&formatted);
                    }
                    HeadingLevel::Sub(content) => {
                        output.push_str(&insert_line_breaks(
                            &content,
                            if output.is_empty() {
                                0
                            } else if right_after_properties {
                                parse_str_to_usize(&main_settings.other_gaps.after_properties, &default_settings.other_gaps.after_properties)? + 1
                            } else {
                                parse_str_to_usize(&main_settings.heading_gaps.before_sub_headings, &default_settings.heading_gaps.before_sub_headings)? + 1
                            },
                            0,
                        ));
                    }
                }

                right_after_properties = false;
                right_after_heading = true;
                right_after_code_block = false;
            }
            MarkdownSection::Content(content) => {
                output.push_str(&insert_line_breaks(
                    &content,
                    if output.is_empty() {
                        0
                    } else if right_after_properties {
                        parse_str_to_usize(&main_settings.other_gaps.after_properties, &default_settings.other_gaps.after_properties)? + 1
                    } else if right_after_code_block {
                        parse_str_to_usize(&main_settings.other_gaps.before_contents_after_code_blocks, &default_settings.other_gaps.before_contents_after_code_blocks)?
                            + 1
                    } else {
                        parse_str_to_usize(&main_settings.other_gaps.before_contents, &default_settings.other_gaps.before_contents)? + 1
                    },
                    0,
                ));

                right_after_properties = false;
                right_after_heading = false;
                right_after_code_block = false;
            }
            MarkdownSection::Code(content) => {
                output.push_str(&insert_line_breaks(
                    &content,
                    if output.is_empty() {
                        0
                    } else if right_after_properties {
                        parse_str_to_usize(&main_settings.other_gaps.after_properties, &default_settings.other_gaps.after_properties)? + 1
                    } else if right_after_heading {
                        parse_str_to_usize(&main_settings.other_gaps.before_code_blocks_after_headings, &default_settings.other_gaps.before_code_blocks_after_headings)?
                            + 1
                    } else {
                        parse_str_to_usize(&main_settings.other_gaps.before_code_blocks, &default_settings.other_gaps.before_code_blocks)? + 1
                    },
                    0,
                ));

                right_after_properties = false;
                right_after_heading = false;
                right_after_code_block = true
            }
        }
    }

    if main_settings.format_options.insert_newline == Some(true) {
        output.push('\n');
    }

    Ok(output)
}

/// Insert line breaks before and after an input.
pub fn insert_line_breaks(input: &str, before: usize, after: usize) -> String {
    let line_breaks_before = "\n".repeat(before);
    let line_breaks_after = "\n".repeat(after);

    format!("{}{}{}", line_breaks_before, input, line_breaks_after)
}
