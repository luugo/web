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
  Place,
} from '../models/index';
import {
    PlaceFromJSON,
    PlaceToJSON,
} from '../models/index';

export interface PlaceDeleteRequest {
    id: string;
}

export interface PlaceGetRequest {
    id?: string;
    city?: string;
    state?: string;
    isActive?: boolean;
}

export interface PlacePostRequest {
    place: Place;
}

export interface PlacePutRequest {
    place: Place;
}

/**
 * 
 */
export class PlaceApi extends runtime.BaseAPI {

    /**
     * Delete Operation
     * CRU[D]
     */
    async placeDeleteRaw(requestParameters: PlaceDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling placeDelete.');
        }

        const queryParameters: any = {};

        if (requestParameters.id !== undefined) {
            queryParameters['id'] = requestParameters.id;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearerAuth", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/place`,
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
    async placeDelete(requestParameters: PlaceDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.placeDeleteRaw(requestParameters, initOverrides);
    }

    /**
     * Read Operation
     * C[R]UD
     */
    async placeGetRaw(requestParameters: PlaceGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<Place>>> {
        const queryParameters: any = {};

        if (requestParameters.id !== undefined) {
            queryParameters['id'] = requestParameters.id;
        }

        if (requestParameters.city !== undefined) {
            queryParameters['city'] = requestParameters.city;
        }

        if (requestParameters.state !== undefined) {
            queryParameters['state'] = requestParameters.state;
        }

        if (requestParameters.isActive !== undefined) {
            queryParameters['isActive'] = requestParameters.isActive;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/place`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(PlaceFromJSON));
    }

    /**
     * Read Operation
     * C[R]UD
     */
    async placeGet(requestParameters: PlaceGetRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<Place>> {
        const response = await this.placeGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Create Operation
     * [C]RUD
     */
    async placePostRaw(requestParameters: PlacePostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<string>> {
        if (requestParameters.place === null || requestParameters.place === undefined) {
            throw new runtime.RequiredError('place','Required parameter requestParameters.place was null or undefined when calling placePost.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearerAuth", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/place`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: PlaceToJSON(requestParameters.place),
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
    async placePost(requestParameters: PlacePostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        const response = await this.placePostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Update Operation
     * CR[U]D
     */
    async placePutRaw(requestParameters: PlacePutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<string>> {
        if (requestParameters.place === null || requestParameters.place === undefined) {
            throw new runtime.RequiredError('place','Required parameter requestParameters.place was null or undefined when calling placePut.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearerAuth", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/place`,
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: PlaceToJSON(requestParameters.place),
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
    async placePut(requestParameters: PlacePutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        const response = await this.placePutRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
