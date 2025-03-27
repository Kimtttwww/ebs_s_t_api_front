/**
 * 개행문자 -> 개행태그 + XSS 방어
 * @param {string} strng 변환할 문자열
 * @returns 변환된 문자열
*/
export function CRLFToTagConverter(string) {
	return XSSConverter(string.replace('\n', '<br>').replace('\r', '<br>').replace('\t', '&nbsp;').trim());
}

/**
 * 개행태그 -> 개행문자
 * @param {string} string 변환할 문자열
 * @returns 변환된 문자열
 */
export function TagToCRLFConverter(string) {
	return string.replace('<br>', '\n').replace('&nbsp;', '\t').trim();
}

/**
 * XSS 방어
 * @param {string} string 변환할 문자열
 * @returns 변환된 문자열
 */
export function XSSConverter(string) {
	return string.replace('<', '&lt;').replace('>', '&gt;').trim();
}