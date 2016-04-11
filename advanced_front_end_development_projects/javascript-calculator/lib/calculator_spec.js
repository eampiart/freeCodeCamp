describe('Calculator', function() {
  var runner = element(by.binding('runnerString'));
  var no1 = element(by.id('no1'));
  var no2 = element(by.id('no2'));
  var no3 = element(by.id('no3'));
  var no4 = element(by.id('no4'));
  var no5 = element(by.id('no5'));
  var no6 = element(by.id('no6'));
  var no7 = element(by.id('no7'));
  var no8 = element(by.id('no8'));
  var no9 = element(by.id('no9'));
  var no0 = element(by.id('no0'));
  var noDecimalPoint = element(by.id('dot'));
  var opAdd = element(by.id('add'));
  var opSubtract = element(by.id('subtract'));
  var opMultiply = element(by.id('multiply'));
  var opDivide = element(by.id('divide'));
  var opEqual = element(by.id('equal'));
  var opClear = element(by.id('clear'));

  beforeEach(function() {
    browser.get(browser.params.url);
  });

  it('should have a title', function() {
    expect(browser.getTitle()).toEqual('JavaScript Calculator');
  });

  it('should have buttons for all the digits', function() {
    expect(no1).toBeTruthy();
    expect(no2).toBeTruthy();
    expect(no3).toBeTruthy();
    expect(no4).toBeTruthy();
    expect(no5).toBeTruthy();
    expect(no6).toBeTruthy();
    expect(no7).toBeTruthy();
    expect(no8).toBeTruthy();
    expect(no9).toBeTruthy();
    expect(no0).toBeTruthy();
  });

  it('should accept multiple digits as one number', function() {
    no1.click();
    no2.click();

    expect(runner.getText()).toBe('12');
  });

  it('should add two numbers', function() {
    no1.click();
    opAdd.click();
    no2.click();
    opEqual.click();

    expect(runner.getText()).toBe('3');
  });

  it('should subtract two numbers', function() {
    no4.click();
    opSubtract.click();
    no2.click();
    opEqual.click();

    expect(runner.getText()).toBe('2');
  });

  it('should multiply two numbers', function() {
    no4.click();
    opMultiply.click();
    no3.click();
    opEqual.click();

    expect(runner.getText()).toBe('12');
  });

  it('should divide two numbers', function() {
    no1.click();
    no2.click();
    opDivide.click();
    no3.click();
    opEqual.click();

    expect(runner.getText()).toBe('4');
  });

  it('should clear the input field with a clear button', function() {
    no1.click();
    no1.click();
    no2.click();
    opDivide.click();
    no3.click();
    opMultiply.click();
    opClear.click();

    expect(runner.getText()).toBe('');
  });

  it('should be able to chain multiple operations together', function() {
    no1.click();
    opAdd.click();
    no1.click();
    no2.click();
    opDivide.click();
    no3.click();
    opMultiply.click();
    no7.click();
    no8.click();
    opSubtract.click();
    no3.click();
    no0.click();
    no0.click();
    opEqual.click();

    expect(runner.getText()).toBe('13');
  });

  it('should handle decimal point numbers', function() {
    no1.click();
    noDecimalPoint.click();
    no1.click();

    expect(runner.getText()).toBe('1.1');

    opAdd.click();
    no1.click();
    no1.click();
    noDecimalPoint.click();
    no1.click();
    opEqual.click();

    expect(runner.getText()).toBe('12.2');

    opSubtract.click();
    no1.click();
    no2.click();
    noDecimalPoint.click();
    no2.click();
    opEqual.click();

    expect(runner.getText()).toBe('0');
  });

  it('should clear after and equal sign if a new number follows', function() {
    no4.click();
    opMultiply.click();
    no3.click();
    opEqual.click();

    no3.click();
    expect(runner.getText()).toBe('3');
  });
});
