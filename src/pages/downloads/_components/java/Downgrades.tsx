import { Component, createUniqueId, For } from "solid-js";
import { RawDowngrades } from "./schemas/downgrades";

export interface DowngradesProps {
  data: RawDowngrades;
  latestVersion: string;
  value: string;
  onChange: (value: string) => void;
}

export const Downgrades: Component<DowngradesProps> = (props) => {
  const id = createUniqueId();

  function getVersionName(version: string): string {
    return props.data.version_names[version] ?? props.data.templates.format_name.replace("{version}", version);
  }

  return (
    <div class="hstack">
      <label for={id}>
        <strong>Minecraft version:</strong>
      </label>

      <select id={id} class="select" value={props.value} onChange={(e) => props.onChange(e.currentTarget.value)}>
        <option value="none">{props.latestVersion}</option>
        <For each={props.data.pack_formats.versions}>{(version) => <option value={version}>{getVersionName(version)}</option>}</For>
      </select>
    </div>
  );
};
