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

import { exists, mapValues } from '../runtime';
import type { RentableGeolocation } from './RentableGeolocation';
import {
    RentableGeolocationFromJSON,
    RentableGeolocationFromJSONTyped,
    RentableGeolocationToJSON,
} from './RentableGeolocation';

/**
 * 
 * @export
 * @interface Rentable
 */
export interface Rentable {
    /**
     * 
     * @type {string}
     * @memberof Rentable
     */
    id?: string;
    /**
     * 
     * @type {Date}
     * @memberof Rentable
     */
    readonly createdAt?: Date;
    /**
     * 
     * @type {Date}
     * @memberof Rentable
     */
    readonly updatedAt?: Date | null;
    /**
     * 
     * @type {string}
     * @memberof Rentable
     */
    thumbnail?: string | null;
    /**
     * 
     * @type {string}
     * @memberof Rentable
     */
    title: string;
    /**
     * 
     * @type {string}
     * @memberof Rentable
     */
    description: string;
    /**
     * 
     * @type {string}
     * @memberof Rentable
     */
    type: RentableTypeEnum;
    /**
     * 
     * @type {string}
     * @memberof Rentable
     */
    place: string;
    /**
     * 
     * @type {number}
     * @memberof Rentable
     */
    price: number;
    /**
     * 
     * @type {number}
     * @memberof Rentable
     */
    discount?: number;
    /**
     * 
     * @type {string}
     * @memberof Rentable
     */
    billingFrequency: RentableBillingFrequencyEnum;
    /**
     * 
     * @type {string}
     * @memberof Rentable
     */
    userId: string;
    /**
     * 
     * @type {string}
     * @memberof Rentable
     */
    categoryId: string;
    /**
     * 
     * @type {RentableGeolocation}
     * @memberof Rentable
     */
    geolocation: RentableGeolocation;
}


/**
 * @export
 */
export const RentableTypeEnum = {
    Place: 'PLACE',
    Item: 'ITEM',
    Service: 'SERVICE',
    Auto: 'AUTO'
} as const;
export type RentableTypeEnum = typeof RentableTypeEnum[keyof typeof RentableTypeEnum];

/**
 * @export
 */
export const RentableBillingFrequencyEnum = {
    Hourly: 'HOURLY',
    Daily: 'DAILY',
    Weekly: 'WEEKLY',
    Monthly: 'MONTHLY',
    Yearly: 'YEARLY'
} as const;
export type RentableBillingFrequencyEnum = typeof RentableBillingFrequencyEnum[keyof typeof RentableBillingFrequencyEnum];


/**
 * Check if a given object implements the Rentable interface.
 */
export function instanceOfRentable(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "title" in value;
    isInstance = isInstance && "description" in value;
    isInstance = isInstance && "type" in value;
    isInstance = isInstance && "place" in value;
    isInstance = isInstance && "price" in value;
    isInstance = isInstance && "billingFrequency" in value;
    isInstance = isInstance && "userId" in value;
    isInstance = isInstance && "categoryId" in value;
    isInstance = isInstance && "geolocation" in value;

    return isInstance;
}

export function RentableFromJSON(json: any): Rentable {
    return RentableFromJSONTyped(json, false);
}

export function RentableFromJSONTyped(json: any, ignoreDiscriminator: boolean): Rentable {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'createdAt': !exists(json, 'createdAt') ? undefined : (new Date(json['createdAt'])),
        'updatedAt': !exists(json, 'updatedAt') ? undefined : (json['updatedAt'] === null ? null : new Date(json['updatedAt'])),
        'thumbnail': !exists(json, 'thumbnail') ? undefined : json['thumbnail'],
        'title': json['title'],
        'description': json['description'],
        'type': json['type'],
        'place': json['place'],
        'price': json['price'],
        'discount': !exists(json, 'discount') ? undefined : json['discount'],
        'billingFrequency': json['billingFrequency'],
        'userId': json['userId'],
        'categoryId': json['categoryId'],
        'geolocation': RentableGeolocationFromJSON(json['geolocation']),
    };
}

export function RentableToJSON(value?: Rentable | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'thumbnail': value.thumbnail,
        'title': value.title,
        'description': value.description,
        'type': value.type,
        'place': value.place,
        'price': value.price,
        'discount': value.discount,
        'billingFrequency': value.billingFrequency,
        'userId': value.userId,
        'categoryId': value.categoryId,
        'geolocation': RentableGeolocationToJSON(value.geolocation),
    };
}

