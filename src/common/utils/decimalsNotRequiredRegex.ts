const regex: RegExp = /^([0-9]{1,2})\.[0]{1,2}$/

export default regex;

//Regex used to check whether a string representing a number should be shown to
//a user without decimal places.  The first and only capturing group is used to
//capture any such string without the decimal point or anything after it.
