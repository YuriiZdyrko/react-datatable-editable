module.exports = {
  /*
   * options - {
   *      key: 'key to sort by',
   *      type: 'date or other data types with special ordering rules'
   *      secondarySortKey: 'key to sort by if 'key' values are equal',
   *      secondarySortType: 'same as type',
   *      isOrderDescending: bool
   * }
   * itemsToSort - array of objects
   **/
  sort: function(itemsToSort, options) {

    function _sanitizeDate(value) {
      return new Date(value);
    }

    function _sanitizeString(value) {
      return value ? value.toString().toLowerCase() : '';
    }

    function getSanitizer(options) {
      var _sanitizer;

      if (options.type === 'date') {
        _sanitizer = _sanitizeDate;
      }

      else {
        _sanitizer = _sanitizeString;
      }
      return _sanitizer;
    }

    function sortWithOptions(a, b, options) {

      var sanitizer = getSanitizer(options);
      var sanitizedA = sanitizer(a[options.key]);
      var sanitizedB = sanitizer(b[options.key]);

      if (sanitizedA < sanitizedB) {
        return options.isOrderDescending ? 1 : -1;
      }

      else if (sanitizedA > sanitizedB) {
        return options.isOrderDescending ? -1 : 1;
      }

      else if (options.secondarySortKey && options.key !== options.secondarySortKey) {
        var secondaryOptions = {
          key: options.secondarySortKey,

          // Secondary sort type
          type: null,

          // Set to null to break from recursion
          secondarySortKey: null,

          // Secondary sorting always descending
          isOrderDescending: true
        };
        return sortWithOptions(a, b, secondaryOptions);
      }

      else {
        return 0;
      }
    }

    itemsToSort.sort(
      function(a, b) {
        return sortWithOptions(a, b, options);
      }
    );

    return itemsToSort;
  }
};
