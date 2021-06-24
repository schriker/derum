export type SettingsKey =
  | 'showAvatars'
  | 'showColorNames'
  | 'showNotifications';

export type SettingsSwitchPropsType = {
  text: string;
  value: boolean;
  settingKey: SettingsKey;
  onChange: (key: SettingsKey, value: boolean) => void;
};
