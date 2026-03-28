package com.kiran.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ContactInformation {

    private String email;
    private String mobile;
    private String twitter;
    private String instagram;

}
