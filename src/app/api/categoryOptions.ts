// helpers
import i18n from "../../i18n/config";

export const getCategoryData = () => {
  return [
    {
      key: "drinks",
      text: i18n.t("category.drinks") || "Drinks",
      value: "drinks",
    },
    {
      key: "culture",
      text: i18n.t("category.culture") || "Culture",
      value: "culture",
    },
    { key: "film", text: i18n.t("category.film") || "Film", value: "film" },
    { key: "food", text: i18n.t("category.food") || "Food", value: "food" },
    { key: "music", text: i18n.t("category.music") || "Music", value: "music" },
    {
      key: "travel",
      text: i18n.t("category.travel") || "Travel",
      value: "travel",
    },
  ];
};
