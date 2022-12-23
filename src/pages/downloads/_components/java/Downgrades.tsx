import { Component, createUniqueId, For } from "solid-js";
import { RawDowngrades } from "./schemas/downgrades";

export interface DowngradesProps {
  json: RawDowngrades;
  latestVersion: string;
  value: string;
  onChange: (value: string) => void;
}

export const Downgrades: Component<DowngradesProps> = (props) => {
  const id = createUniqueId();

  function getVersionName(version: string): string {
    return props.json.version_names[version] ?? props.json.templates.format_name.replace("{version}", version);
  }

  return (
    <div class="flex flex--row flex--small flex--center">
      <label for={id}>
        <strong>Minecraft version:</strong>
      </label>

      <select id={id} class="select" value={props.value} onChange={(e) => props.onChange(e.currentTarget.value)}>
        <option value="none">{props.latestVersion}</option>
        <For each={props.json.pack_formats.versions}>{(version) => <option value={version}>{getVersionName(version)}</option>}</For>
      </select>
    </div>
  );
};
