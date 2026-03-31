package com.kiran.responseDto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class EventResponse {

    private Long id;
    private String name;
    private String restaurantName;

    private String location;
    private String image;
    private LocalDateTime startTime;
    private LocalDateTime endTime;

}
