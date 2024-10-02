import { StatusCodes } from 'http-status-codes';
import p from 'pactum';

const baseUrl = 'https://api-desafio-qa.onrender.com/company';
let companyId = '';
let createdId = '';
let createdProductId = '';

describe('Company API', () => {
     it('Pegar as informações de varias empresas empresa', async () => {
        const response = await p.spec()
        .get(`${baseUrl}`)
        .expectStatus(StatusCodes.OK);
        companyId = response.body[0].id;
    });

    it('Pegar as informações de uma empresa', async () => {
        await p.spec()
        .get(`${baseUrl}/${companyId}`)
        .expectStatus(StatusCodes.OK);
    });

    it('Pegar as informações de uma empresa que não existe', async () => {
        await p.spec()
        .get(`${baseUrl}/9999`)
        .expectStatus(StatusCodes.NOT_FOUND);
    });

    it('Pegar as informações de uma empresa com o id inválido', async () => {
        await p.spec()
        .get(`${baseUrl}/a`)
        .expectStatus(StatusCodes.BAD_REQUEST);
    });

    it('Criar uma empresa', async () => {
        let response;
        response = await p.spec()
            .post(`${baseUrl}`)
            .withJson({
                "name": "Churrascaria",
                "cnpj": "11111111111111",
                "state": "teste",
                "city": "teste",
                "address": "teste",
                "sector": "teste"
            })
            .expectStatus(StatusCodes.CREATED)
            .expectBodyContains("Churrascaria");

        createdId = response.body.id;
    });

    it('Atualizar uma empresa', async () => {
        await p.spec()
            .put(`${baseUrl}/${createdId}`)
            .withJson({
                "name": "Churrascaria 2",
                "cnpj": "11111111111111",
                "state": "teste",
                "city": "teste",
                "address": "teste",
                "sector": "teste"
            })
            .expectStatus(StatusCodes.OK)
            .expectBodyContains("Churrascaria 2");
    });

    it('Listar todos os produtos de uma empresa', async () => {
        await p.spec()
            .get(`${baseUrl}/${createdId}/products`)
            .expectStatus(StatusCodes.OK);
    });

    it('Criar um produto para a empresa', async () => {
        let response;
        response = await p.spec()
            .post(`${baseUrl}/${createdId}/products`)
            .withJson({
                "productName": "produto teste",
                "productDescription": "descricao teste",
                "price": 5
            })
            .expectStatus(StatusCodes.CREATED)

        createdProductId = response.body.productId;
    });

    it('Atualizar um produto da empresa', async () => {
        await p.spec()
            .put(`${baseUrl}/${createdId}/products/1`)
            .withJson({
                "productName": "produto teste 2",
                "productDescription": "descricao teste",
                "price": 5
            })
            .expectStatus(StatusCodes.OK)
    });

    it('Deletar um produto da empresa', async () => {
        await p.spec()
            .delete(`${baseUrl}/${createdId}/products/1`)
            .expectStatus(StatusCodes.OK);
    });

    it('Listar todos os funcionários de uma empresa', async () => {
        await p.spec()
            .get(`${baseUrl}/${createdId}/employees`)
            .expectStatus(StatusCodes.OK);
    });

    it('Cria um funcionário para a empresa', async () => {
        await p.spec()
            .post(`${baseUrl}/${createdId}/employees`)
            .withJson({
                "name": "funcionario teste",
                "position": "string",
                "email": "user@example.com"
            })
            .expectStatus(StatusCodes.CREATED)
    });

    it('Atualizar um funcionário da empresa', async () => {
        await p.spec()
            .put(`${baseUrl}/${createdId}/employees/1`)
            .withJson({
                "name": "funcionario teste 2",
                "position": "string",
                "email": "user@example.com"
            })
            .expectStatus(StatusCodes.OK)
    });

    it('Deletar um funcionário da empresa', async () => {
        await p.spec()
            .delete(`${baseUrl}/${createdId}/employees/1`)
            .expectStatus(StatusCodes.OK);
    });

    it('Listar todos os serviços de uma empresa', async () => {
        await p.spec()
            .get(`${baseUrl}/${createdId}/services`)
            .expectStatus(StatusCodes.OK);
    });

    it('Criar um serviço para a empresa', async () => {
        await p.spec()
            .post(`${baseUrl}/${createdId}/services`)
            .withJson({
                "serviceName": "service teste",
                "serviceDescription": "service teste"
            })
            .expectStatus(StatusCodes.CREATED)
    });

    it('Atualizar um serviço da empresa', async () => {
        await p.spec()
            .put(`${baseUrl}/${createdId}/services/1`)
            .withJson({
                "serviceName": "service teste 2",
                "serviceDescription": "service teste"
            })
            .expectStatus(StatusCodes.OK)
    });

    it('Deletar um serviço da empresa', async () => {
        await p.spec()
            .delete(`${baseUrl}/${createdId}/services/1`)
            .expectStatus(StatusCodes.OK);
    });

    it('Deletar uma empresa', async () => {
        await p.spec()
            .delete(`${baseUrl}/${createdId}`)
            .expectStatus(StatusCodes.OK);
    });
});