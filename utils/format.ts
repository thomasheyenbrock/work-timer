import format from "date-fns/format";
import de from "date-fns/locale/de";

// by providing a default string of 'PP' or any of its variants for `formatStr`
// it will format dates in whichever way is appropriate to the locale
export default function(
  date: Parameters<typeof format>["0"],
  formatStr: Parameters<typeof format>["1"] = "PP",
  options: Parameters<typeof format>["2"] | undefined = {}
) {
  return format(date, formatStr, {
    ...options,
    locale: de
  });
}
