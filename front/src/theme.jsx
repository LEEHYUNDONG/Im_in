const colors = {
  white: "#ffffff",
  black: "#000000",
  grey_0: "#d5d5d5",
  grey_1: "#a6a6a6",
  red: "#e84118",
  blue: "#3679fe"
};

const dark_colors = {
  white: "#34495e",
  black: "#000000",
  grey_0: "#d5d5d5",
  grey_1: "#a6a6a6",
  red: "#e84118",
  blue: "#3498db"
};

export const theme = {
  background: colors.white,
  text: colors.black,
  imageBackground: colors.grey_0,
  headerTintColor: colors.black,
  tabActiveColor: colors.blue,
  tabInactiveColor: colors.grey_1,

  spinnerBackground: colors.black,
  spinnerIndicator: colors.white,

  label: colors.grey_1,
  listBorder: colors.grey_0,
  listTime: colors.grey_1,
  listDescription: colors.grey_1,
  listIcon: colors.black,

  check: colors.green,
  late: colors.orange,
  absen: colors.red,
};
export const dark_theme = {
  background: dark_colors.white,
  text: dark_colors.black,
  imageBackground: dark_colors.grey_0,
  headerTintColor: dark_colors.black,
  tabActiveColor: dark_colors.blue,
  tabInactiveColor: dark_colors.grey_1,

  spinnerBackground: dark_colors.black,
  spinnerIndicator: dark_colors.white,

  label: dark_colors.grey_1,
  listBorder: dark_colors.grey_0,
  listTime: dark_colors.grey_1,
  listDescription: dark_colors.grey_1,
  listIcon: dark_colors.black,

  check: dark_colors.green,
  late: dark_colors.orange,
  absen: dark_colors.red,
};