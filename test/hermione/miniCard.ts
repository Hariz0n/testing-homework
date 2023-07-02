describe('Тестирование карточек товара', function () {
  afterEach(async function() {
    await this.browser.mockClearAll()
  })
  beforeEach(async function() {
    const productMock = await this.browser.mock('**/products/0')
    const productsMock = await this.browser.mock('**/products')
    productMock.respond({
      id: 0,
      name: 'Mock Product 1',
      price: 1000,
      color: 'black',
      material: 'silver',
      description: 'Mock 1'
    })
    productsMock.respond([
      {
        id: 0,
        name: 'Macbook Air M2 (2023)',
        price: 170000,
        color: 'Space Grey',
        material: 'Aluminum',
        description: 'Dorogo, ochen\''
      },
      {
        id: 1,
        name: 'Macbook Pro M2 (2023)',
        price: 250000,
        color: 'Silver',
        material: 'Aluminum',
        description: 'Esche dorozhe'
      },
      {
        id: 2,
        name: 'IPhone 7',
        price: 20000,
        color: 'Space Grey',
        material: 'Aluminum',
        description: 'IProne 7'
      },
      {
        id: 3,
        name: 'IPhone 12',
        price: 100000,
        color: 'Black',
        material: 'Metal',
        description: 'IPhone 12'
      }
    ])
  })
  it('Корректно выводится имя товара', async function () {
    await this.browser.setWindowSize(1920, 1080)
    await this.browser.url('http://localhost:3000/hw/store/catalog')
    await this.browser.assertView('plain', '.ProductItem', {
      ignoreElements: [
        '.card-body *:not(.card-title)'
      ]
    })
  });
  it('Корректно выводится цена товара', async function () {
    await this.browser.setWindowSize(1920, 1080)
    await this.browser.url('http://localhost:3000/hw/store/catalog')
    await this.browser.assertView('plain', '.ProductItem', {
      ignoreElements: [
        '.card-body *:not(.ProductItem-Price)'
      ]
    })
  });
  it('Корректно выводится ссылка на страниу товара', async function () {
    await this.browser.setWindowSize(1920, 1080)
    await this.browser.url('http://localhost:3000/hw/store/catalog')
    await this.browser.assertView('plain', '.ProductItem', {
      ignoreElements: [
        '.card-body > *:not(.ProductItem-DetailsLink)'
      ]
    })
  });
  it('Корретная ссылка на товар', async function () {
    await this.browser.setWindowSize(1920, 1080)
    await this.browser.url('http://localhost:3000/hw/store/catalog')
    expect(await (await this.browser.$('.ProductItem-DetailsLink')).getAttribute('href')).toEqual('/hw/store/catalog/0')
  });
});