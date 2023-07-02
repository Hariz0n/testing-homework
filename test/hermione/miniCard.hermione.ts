describe('Тестирование карточек товара', function () {
  it('Корректно выводится имя товара', async function () {
    await this.browser.setWindowSize(1920, 6000)
    await this.browser.url('http://localhost:3000/hw/store/catalog')
    const x = await (await this.browser.$('.ProductItem-Name')).getText()
    expect(x).not.toEqual('')
  });
  it('Корректно выводится цена товара', async function () {
    await this.browser.setWindowSize(1920, 6000)
    await this.browser.url('http://localhost:3000/hw/store/catalog')
    const x = await (await this.browser.$('.ProductItem-Price')).getText()
    expect(x).not.toEqual('')
  });
  it('Корректно выводится ссылка на страниу товара', async function () {
    await this.browser.setWindowSize(1920, 6000)
    await this.browser.url('http://localhost:3000/hw/store/catalog')
    const x = await (await this.browser.$('.ProductItem-DetailsLink')).getText()
    expect(x).not.toEqual('')
  });
  it('Корретная ссылка на товар', async function () {
    await this.browser.setWindowSize(1920, 6000)
    await this.browser.url('http://localhost:3000/hw/store/catalog')
    expect(await (await this.browser.$('.ProductItem-DetailsLink')).getAttribute('href')).toEqual('/hw/store/catalog/0')
  });
});