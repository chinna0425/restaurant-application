package com.kiran.requestDto;

import lombok.Data;

@Data
public class EventRequest {
    private String name;
    private String location;
    private String image;
    private String startedAt;
    private String endsAt;
}
