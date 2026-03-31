package com.kiran.responseDto;

import lombok.Data;

@Data
public class AddressResponse {
    private Long id;
    private String streetAddress;
    private String city;
    private String stateProvince;
    private String postalCode;
    private String country;
}
