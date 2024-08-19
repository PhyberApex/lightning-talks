// Extending library interfaces (e.g., jQuery)
interface JQuery {
  t(key: string): string;
}

const $element = $('div');
$element.t('hello.world');

interface JQueryStatic {
  i18n: {
    t(key: string): string;
  };
}

// Usage of static method
$.i18n.t('hello.world');