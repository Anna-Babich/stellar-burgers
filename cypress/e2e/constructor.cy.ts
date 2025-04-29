import  ingredients from '../fixtures/ingredients.json';
import orders from '../fixtures/orders.json';
import login from '../fixtures/login.json';
import user from '../fixtures/user.json';

describe('constructor', () => {

    beforeEach(() => {
        cy.intercept('GET', 'api/ingredients', {fixture: 'ingredients.json'}).as('getIngredients');
        cy.intercept('GET', 'auth/user', {fixture: 'user.json'}).as('getUser');
        cy.intercept('POST', 'auth/login', {fixture: 'login.json'}).as('postLogin');
        cy.intercept('POST', 'orders', { fixture: 'orders.json'}).as('postOrder');

        cy.setCookie('accessToken', login.accessToken);
        localStorage.setItem('refreshToken', login.refreshToken);

        cy.visit('http://localhost:4000');
    })

    afterEach(() => {
        cy.clearCookies();
        localStorage.clear();
    })

    it('отображение списка ингредиентов', () => {
        cy.wait('@getIngredients');
        cy.get('[data-cy=ingredient-card]').should('have.length.greaterThan', 0);
    });

    it('добавлени ингредиента в коснтруткор', () => {
        cy.wait('@getIngredients');

        cy.contains('Добавить').first().click();
        cy.get('[data-cy=burger-constructor]').should('have.length.greaterThan', 0);
    })

    it('открытие модального окна ингредиента', () => {
        cy.wait('@getIngredients');
        cy.get('[data-cy=ingredient-card]').first().click();
        cy.get('[data-cy=modal]').should('be.visible');
    })

    it('закрытие модального окна ингредиента через крестик', () => {
        cy.wait('@getIngredients');
        cy.get('[data-cy=ingredient-card]').first().click();
        cy.get('[data-cy=close-modal-button]').click();
        cy.get('[data-cy=modal]').should('not.exist');
    })

    it('закрытие модального окна ингредиента через оверлей', () => {
        cy.wait('@getIngredients');
        cy.get('[data-cy=ingredient-card]').first().click();
        cy.get('[data-cy=modal-overlay]').click({force: true});
        cy.get('[data-cy=modal-overlay]').should('not.exist');
    })

    it('процесс создания заказа', () => {
        cy.wait('@getIngredients');
        
        cy.contains('Добавить').first().click();
        cy.contains('Оформить заказ').click();
        
        cy.get('input[name=email]').type('anna@yandex.ru');
        cy.get('input[name=password]').type('1234567890');
        cy.contains('Войти').click();
        
        cy.contains('Оформить заказ').click();

        cy.get('[data-cy=modal]').should('be.visible');
        cy.contains('75800').should('exist');

        cy.get('[data-cy=close-modal-button]').click();
        cy.get('[data-cy=modal]').should('not.exist');

        cy.get('[data-cy=burger-bun]').should('not.exist');
    })
})