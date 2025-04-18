/* tslint:disable */
/* eslint-disable */
/**
 * LuuGo - Rest API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  Favorite,
  FavoritePostRequest,
} from '../models/index';
import {
    FavoriteFromJSON,
    FavoriteToJSON,
    FavoritePostRequestFromJSON,
    FavoritePostRequestToJSON,
} from '../models/index';

export interface FavoriteDeleteRequest {
    rentableId: string;
    userId: string;
    acceptLanguage?: string;
}

export interface FavoriteGetRequest {
    userId: string;
    acceptLanguage?: string;
    rentableId?: string;
}

export interface FavoritePostOperationRequest {
    favoritePostRequest: FavoritePostRequest;
    acceptLanguage?: string;
}

/**
 * 
 */
export class FavoriteApi extends runtime.BaseAPI {

    /**
     * Delete Operation
     */
    async favoriteDeleteRaw(requestParameters: FavoriteDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.rentableId === null || requestParameters.rentableId === undefined) {
            throw new runtime.RequiredError('rentableId','Required parameter requestParameters.rentableId was null or undefined when calling favoriteDelete.');
        }

        if (requestParameters.userId === null || requestParameters.userId === undefined) {
            throw new runtime.RequiredError('userId','Required parameter requestParameters.userId was null or undefined when calling favoriteDelete.');
        }

        const queryParameters: any = {};

        if (requestParameters.rentableId !== undefined) {
            queryParameters['rentableId'] = requestParameters.rentableId;
        }

        if (requestParameters.userId !== undefined) {
            queryParameters['userId'] = requestParameters.userId;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (requestParameters.acceptLanguage !== undefined && requestParameters.acceptLanguage !== null) {
            headerParameters['Accept-Language'] = String(requestParameters.acceptLanguage);
        }

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearerAuth", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/favorite`,
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Delete Operation
     */
    async favoriteDelete(requestParameters: FavoriteDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.favoriteDeleteRaw(requestParameters, initOverrides);
    }

    /**
     * Get favorite
     * C[R]UD
     */
    async favoriteGetRaw(requestParameters: FavoriteGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<Favorite>>> {
        if (requestParameters.userId === null || requestParameters.userId === undefined) {
            throw new runtime.RequiredError('userId','Required parameter requestParameters.userId was null or undefined when calling favoriteGet.');
        }

        const queryParameters: any = {};

        if (requestParameters.rentableId !== undefined) {
            queryParameters['rentableId'] = requestParameters.rentableId;
        }

        if (requestParameters.userId !== undefined) {
            queryParameters['userId'] = requestParameters.userId;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (requestParameters.acceptLanguage !== undefined && requestParameters.acceptLanguage !== null) {
            headerParameters['Accept-Language'] = String(requestParameters.acceptLanguage);
        }

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearerAuth", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/favorite`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(FavoriteFromJSON));
    }

    /**
     * Get favorite
     * C[R]UD
     */
    async favoriteGet(requestParameters: FavoriteGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<Favorite>> {
        const response = await this.favoriteGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Set rentable as favorite.
     * [C]RUD
     */
    async favoritePostRaw(requestParameters: FavoritePostOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<string>> {
        if (requestParameters.favoritePostRequest === null || requestParameters.favoritePostRequest === undefined) {
            throw new runtime.RequiredError('favoritePostRequest','Required parameter requestParameters.favoritePostRequest was null or undefined when calling favoritePost.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (requestParameters.acceptLanguage !== undefined && requestParameters.acceptLanguage !== null) {
            headerParameters['Accept-Language'] = String(requestParameters.acceptLanguage);
        }

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearerAuth", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/favorite`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: FavoritePostRequestToJSON(requestParameters.favoritePostRequest),
        }, initOverrides);

        if (this.isJsonMime(response.headers.get('content-type'))) {
            return new runtime.JSONApiResponse<string>(response);
        } else {
            return new runtime.TextApiResponse(response) as any;
        }
    }

    /**
     * Set rentable as favorite.
     * [C]RUD
     */
    async favoritePost(requestParameters: FavoritePostOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        const response = await this.favoritePostRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
