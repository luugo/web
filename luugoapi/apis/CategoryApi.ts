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
  Category,
} from '../models/index';
import {
    CategoryFromJSON,
    CategoryToJSON,
} from '../models/index';

export interface CategoryActiveGetRequest {
    acceptLanguage?: string;
    place?: string;
}

export interface CategoryDeleteRequest {
    acceptLanguage?: string;
    id?: string;
}

export interface CategoryGetRequest {
    xLimit?: number;
    xOffset?: number;
    acceptLanguage?: string;
    id?: string;
    isActive?: boolean;
    isVisibleInHome?: boolean;
    type?: CategoryGetTypeEnum;
}

export interface CategoryHotGetRequest {
    place: string;
    acceptLanguage?: string;
}

export interface CategoryPostRequest {
    category: Category;
    acceptLanguage?: string;
}

export interface CategoryPutRequest {
    category: Category;
    acceptLanguage?: string;
}

export interface CategorySearchRentableGetRequest {
    input: string;
    xUserLat?: number;
    xUserLon?: number;
    xMinDistance?: number;
    acceptLanguage?: string;
}

/**
 * 
 */
export class CategoryApi extends runtime.BaseAPI {

    /**
     * Read Operation
     * C[R]UD
     */
    async categoryActiveGetRaw(requestParameters: CategoryActiveGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<Category>>> {
        const queryParameters: any = {};

        if (requestParameters.place !== undefined) {
            queryParameters['place'] = requestParameters.place;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (requestParameters.acceptLanguage !== undefined && requestParameters.acceptLanguage !== null) {
            headerParameters['Accept-Language'] = String(requestParameters.acceptLanguage);
        }

        const response = await this.request({
            path: `/category/active`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(CategoryFromJSON));
    }

    /**
     * Read Operation
     * C[R]UD
     */
    async categoryActiveGet(requestParameters: CategoryActiveGetRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<Category>> {
        const response = await this.categoryActiveGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Delete Operation
     * CRU[D]
     */
    async categoryDeleteRaw(requestParameters: CategoryDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        const queryParameters: any = {};

        if (requestParameters.id !== undefined) {
            queryParameters['id'] = requestParameters.id;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (requestParameters.acceptLanguage !== undefined && requestParameters.acceptLanguage !== null) {
            headerParameters['Accept-Language'] = String(requestParameters.acceptLanguage);
        }

        const response = await this.request({
            path: `/category`,
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Delete Operation
     * CRU[D]
     */
    async categoryDelete(requestParameters: CategoryDeleteRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.categoryDeleteRaw(requestParameters, initOverrides);
    }

    /**
     * Read Operation
     * C[R]UD
     */
    async categoryGetRaw(requestParameters: CategoryGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<Category>>> {
        const queryParameters: any = {};

        if (requestParameters.id !== undefined) {
            queryParameters['id'] = requestParameters.id;
        }

        if (requestParameters.isActive !== undefined) {
            queryParameters['isActive'] = requestParameters.isActive;
        }

        if (requestParameters.isVisibleInHome !== undefined) {
            queryParameters['isVisibleInHome'] = requestParameters.isVisibleInHome;
        }

        if (requestParameters.type !== undefined) {
            queryParameters['type'] = requestParameters.type;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (requestParameters.xLimit !== undefined && requestParameters.xLimit !== null) {
            headerParameters['X-Limit'] = String(requestParameters.xLimit);
        }

        if (requestParameters.xOffset !== undefined && requestParameters.xOffset !== null) {
            headerParameters['X-Offset'] = String(requestParameters.xOffset);
        }

        if (requestParameters.acceptLanguage !== undefined && requestParameters.acceptLanguage !== null) {
            headerParameters['Accept-Language'] = String(requestParameters.acceptLanguage);
        }

        const response = await this.request({
            path: `/category`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(CategoryFromJSON));
    }

    /**
     * Read Operation
     * C[R]UD
     */
    async categoryGet(requestParameters: CategoryGetRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<Category>> {
        const response = await this.categoryGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Read Operation
     * C[R]UD
     */
    async categoryHotGetRaw(requestParameters: CategoryHotGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<Category>>> {
        if (requestParameters.place === null || requestParameters.place === undefined) {
            throw new runtime.RequiredError('place','Required parameter requestParameters.place was null or undefined when calling categoryHotGet.');
        }

        const queryParameters: any = {};

        if (requestParameters.place !== undefined) {
            queryParameters['place'] = requestParameters.place;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (requestParameters.acceptLanguage !== undefined && requestParameters.acceptLanguage !== null) {
            headerParameters['Accept-Language'] = String(requestParameters.acceptLanguage);
        }

        const response = await this.request({
            path: `/category/hot`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(CategoryFromJSON));
    }

    /**
     * Read Operation
     * C[R]UD
     */
    async categoryHotGet(requestParameters: CategoryHotGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<Category>> {
        const response = await this.categoryHotGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Create Operation
     * [C]RUD
     */
    async categoryPostRaw(requestParameters: CategoryPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<string>> {
        if (requestParameters.category === null || requestParameters.category === undefined) {
            throw new runtime.RequiredError('category','Required parameter requestParameters.category was null or undefined when calling categoryPost.');
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
            path: `/category`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CategoryToJSON(requestParameters.category),
        }, initOverrides);

        if (this.isJsonMime(response.headers.get('content-type'))) {
            return new runtime.JSONApiResponse<string>(response);
        } else {
            return new runtime.TextApiResponse(response) as any;
        }
    }

    /**
     * Create Operation
     * [C]RUD
     */
    async categoryPost(requestParameters: CategoryPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        const response = await this.categoryPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Update Operation
     * CR[U]D
     */
    async categoryPutRaw(requestParameters: CategoryPutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<string>> {
        if (requestParameters.category === null || requestParameters.category === undefined) {
            throw new runtime.RequiredError('category','Required parameter requestParameters.category was null or undefined when calling categoryPut.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (requestParameters.acceptLanguage !== undefined && requestParameters.acceptLanguage !== null) {
            headerParameters['Accept-Language'] = String(requestParameters.acceptLanguage);
        }

        const response = await this.request({
            path: `/category`,
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: CategoryToJSON(requestParameters.category),
        }, initOverrides);

        if (this.isJsonMime(response.headers.get('content-type'))) {
            return new runtime.JSONApiResponse<string>(response);
        } else {
            return new runtime.TextApiResponse(response) as any;
        }
    }

    /**
     * Update Operation
     * CR[U]D
     */
    async categoryPut(requestParameters: CategoryPutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        const response = await this.categoryPutRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Read Operation
     * C[R]UD
     */
    async categorySearchRentableGetRaw(requestParameters: CategorySearchRentableGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<Category>>> {
        if (requestParameters.input === null || requestParameters.input === undefined) {
            throw new runtime.RequiredError('input','Required parameter requestParameters.input was null or undefined when calling categorySearchRentableGet.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (requestParameters.xUserLat !== undefined && requestParameters.xUserLat !== null) {
            headerParameters['X-User-Lat'] = String(requestParameters.xUserLat);
        }

        if (requestParameters.xUserLon !== undefined && requestParameters.xUserLon !== null) {
            headerParameters['X-User-Lon'] = String(requestParameters.xUserLon);
        }

        if (requestParameters.xMinDistance !== undefined && requestParameters.xMinDistance !== null) {
            headerParameters['X-Min-Distance'] = String(requestParameters.xMinDistance);
        }

        if (requestParameters.acceptLanguage !== undefined && requestParameters.acceptLanguage !== null) {
            headerParameters['Accept-Language'] = String(requestParameters.acceptLanguage);
        }

        const response = await this.request({
            path: `/category/search-rentable/{input}`.replace(`{${"input"}}`, encodeURIComponent(String(requestParameters.input))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(CategoryFromJSON));
    }

    /**
     * Read Operation
     * C[R]UD
     */
    async categorySearchRentableGet(requestParameters: CategorySearchRentableGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<Category>> {
        const response = await this.categorySearchRentableGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

}

/**
 * @export
 */
export const CategoryGetTypeEnum = {
    Place: 'PLACE',
    Item: 'ITEM',
    Service: 'SERVICE',
    Auto: 'AUTO'
} as const;
export type CategoryGetTypeEnum = typeof CategoryGetTypeEnum[keyof typeof CategoryGetTypeEnum];
