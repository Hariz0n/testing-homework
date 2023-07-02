describe('Тестирование адаптивности страницы каталога', () => {
  afterEach(function()  {
    this.browser.mockClearAll()
    this.browser.execute(() => {
      window.localStorage.clear()
    })
    this.browser.refresh()
  })
  beforeEach(async function () {
    const productsMock = await this.browser.mock('**/products')
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
    const productMock1 = await this.browser.mock('**/products/0')
    productMock1.respond({
      id: 0,
      name: 'Macbook Air M2 (2023)',
      price: 170000,
      color: 'Space Grey',
      material: 'Aluminum',
      description: 'Dorogo, ochen\''
    })
    const productMock2 = await this.browser.mock('**/products/1')
    productMock2.respond({
      id: 1,
      name: 'Macbook Pro M2 (2023)',
      price: 250000,
      color: 'Silver',
      material: 'Aluminum',
      description: 'Esche dorozhe'
    },)
  })
  it('Верная верстка при ширине больше или равной 1400', async function() {
    await this.browser.setWindowSize(1400, 600)
    await this.browser.url('http://localhost:3000/hw/store/catalog');
    await this.browser.assertView('plain', 'body', {screenshotDelay: 1000, ignoreElements: [
        'nav.navbar',
        '.card-body'
      ]});
  });
  it('Верная верстка при ширине больше или равной 1200', async function() {
    await this.browser.setWindowSize(1200, 6000)
    await this.browser.url('http://localhost:3000/hw/store/catalog');
    await this.browser.assertView('plain', 'body', {screenshotDelay: 1000, ignoreElements: [
        'nav.navbar',
        '.card-body'
      ]});
  });
  it('Верная верстка при ширине больше или равной 992', async function() {
    await this.browser.setWindowSize(992, 6000)
    await this.browser.url('http://localhost:3000/hw/store/catalog');
    await this.browser.assertView('plain', 'body', {screenshotDelay: 1000, ignoreElements: [
        'nav.navbar',
        '.card-body'
      ]});
  });
  it('Верная верстка при ширине больше или равной 768', async function() {
    await this.browser.setWindowSize(768, 6000)
    await this.browser.url('http://localhost:3000/hw/store/catalog');
    await this.browser.assertView('plain', 'body', {screenshotDelay: 1000, ignoreElements: [
        'nav.navbar',
        '.card-body'
      ]});
  });
  it('Верная верстка при ширине больше или равной 576', async function() {
    await this.browser.setWindowSize(576, 6000)
    await this.browser.url('http://localhost:3000/hw/store/catalog');
    await this.browser.assertView('plain', 'body', {screenshotDelay: 1000, ignoreElements: [
        'nav.navbar',
        '.card-body'
      ]});
  });
  it('Верная верстка при ширине меньше 576', async function() {
    const productsMock = await this.browser.mock('**/products')
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
    await this.browser.setWindowSize(570, 6000)
    await this.browser.url('http://localhost:3000/hw/store/catalog');
    await this.browser.assertView('plain', 'body', {screenshotDelay: 1000, ignoreElements: [
        'nav.navbar',
        '.card-body'
      ]});
  });
})