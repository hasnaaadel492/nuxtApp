// 👉 IsEmpty
export const isEmpty = (value: unknown): boolean => {
  if (value === null || value === undefined || value === "") return true;

  return !!(Array.isArray(value) && value.length === 0);
};

// 👉 IsNullOrUndefined
export const isNullOrUndefined = (
  value: unknown
): value is undefined | null => {
  return value === null || value === undefined;
};

// 👉 IsEmptyArray
export const isEmptyArray = (arr: unknown): boolean => {
  return Array.isArray(arr) && arr.length === 0;
};

// 👉 IsObject
export const isObject = (obj: unknown): obj is Record<string, unknown> =>
  obj !== null && !!obj && typeof obj === "object" && !Array.isArray(obj);

export const isToday = (date: Date) => {
  const today = new Date();

  return (
    /* eslint-disable operator-linebreak */
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
    /* eslint-enable */
  );
};

//👉 Required Validator
export const requiredValidator = (value: unknown, t: Function) => {
  if (isNullOrUndefined(value) || isEmptyArray(value) || value === false)
    return t("field_required");

  return !!String(value).trim().length || t("field_required");
};

// 👉 Email Validator
export const emailValidator = (value: unknown, t: Function) => {
  if (isEmpty(value)) return true;

  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})$/;

  if (Array.isArray(value))
    return value.every((val) => re.test(String(val))) || t("email_validation");

  return re.test(String(value)) || t("email_validation");
};

// 👉 Password Validator
export const passwordValidator = (password: string, t: Function) => {
  const regExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*()]).{8,}/;

  const validPassword = regExp.test(password);

  return (
    // eslint-disable-next-line operator-linebreak
    validPassword || t("password_validation")
  );
};

// 👉 Confirm Password Validator
export const confirmedValidator = (
  value: string,
  target: string,
  t: Function
) => value === target || t("password_confirmed_validation");

// 👉 Between Validator
export const betweenValidator = (
  value: unknown,
  min: number,
  max: number,
  t: Function
) => {
  const valueAsNumber = Number(value);

  return (
    (Number(min) <= valueAsNumber && Number(max) >= valueAsNumber) ||
    `Enter number between ${min} and ${max}`
  );
};

// 👉 Integer Validator
export const integerValidator = (value: unknown, t: Function) => {
  if (isEmpty(value)) return true;

  if (Array.isArray(value))
    return (
      value.every((val) => /^-?[0-9]+$/.test(String(val))) ||
      t("integer_validation")
    );

  return /^-?[0-9]+$/.test(String(value)) || t("integer_validation");
};

// 👉 Regex Validator
export const regexValidator = (
  value: unknown,
  regex: RegExp | string,
  t: Function
): string | boolean => {
  if (isEmpty(value)) return true;

  let regeX = regex;
  if (typeof regeX === "string") regeX = new RegExp(regeX);

  if (Array.isArray(value))
    return value.every((val) => regexValidator(val, regeX));

  return regeX.test(String(value)) || t("regex_validation");
};

// 👉 Alpha Validator
export const alphaValidator = (value: unknown) => {
  if (isEmpty(value)) return true;

  return /^[A-Z]*$/i.test(String(value)) || t("alph_validation");
};

// 👉 URL Validator
export const urlValidator = (value: unknown) => {
  if (isEmpty(value)) return true;

  const re =
    /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;

  return re.test(String(value)) || "URL is invalid";
};

// 👉 Length Validator
export const lengthValidator = (
  value: unknown,
  length: number,
  t: Function
) => {
  if (isEmpty(value)) return true;

  return (
    String(value).length === length ||
    `The Min Character field must be at least ${length} characters`
  );
};

// 👉 Alpha-dash Validator
export const alphaDashValidator = (value: unknown, t: Function) => {
  if (isEmpty(value)) return true;

  const valueAsString = String(value);

  return /^[0-9A-Z_-]*$/i.test(valueAsString) || t("char_validation");
};

export const englishAlphaValidator = (value: unknown, t: Function) => {
  if (isEmpty(value)) return true;

  const valueAsString = String(value);

  return (
    /^[a-zA-Z\s\d.,!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]*$/i.test(valueAsString) ||
    t("char_validation")
  );
};

export const maxLengthValidator = (value: unknown, length: number) => {
  if (isEmpty(value)) return true;

  return (
    String(value).length <= length ||
    `The character field must be maximum ${length} characters`
  );
};
