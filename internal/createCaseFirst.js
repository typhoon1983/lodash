import stringToArray from './stringToArray';
import toString from '../toString';

/** Used to compose unicode character classes. */
var rsAstralRange = '\\ud800-\\udfff',
    rsComboRange = '\\u0300-\\u036f\\ufe20-\\ufe23',
    rsVarRange = '\\ufe0e\\ufe0f';

/** Used to compose unicode capture groups. */
var rsZWJ = '\\u200d';

/** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
var reHasComplexSymbol = RegExp('[' + rsZWJ + rsAstralRange + rsComboRange + rsVarRange + ']');

/**
 * Creates a function like `_.lowerFirst`.
 *
 * @private
 * @param {string} methodName The name of the `String` case method to use.
 * @returns {Function} Returns the new function.
 */
function createCaseFirst(methodName) {
  return function(string) {
    string = toString(string);

    var strSymbols = reHasComplexSymbol.test(string) ? stringToArray(string) : undefined,
        chr = strSymbols ? strSymbols[0] : string.charAt(0),
        trailing = strSymbols ? strSymbols.slice(1).join('') : string.slice(1);

    return chr[methodName]() + trailing;
  };
}

export default createCaseFirst;
