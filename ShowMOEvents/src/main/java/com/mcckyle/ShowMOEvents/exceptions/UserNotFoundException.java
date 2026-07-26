//***************************************************************************************
//
//     Filename: UserNotFoundException.java
//     Author: Kyle McColgan
//     Date: 25 July 2026
//     Description: This file implements custom exception handling
//                  to handle the lack of an existing user in the database.
//
//***************************************************************************************

package com.mcckyle.ShowMOEvents.exceptions;

//***************************************************************************************

public class UserNotFoundException extends RuntimeException
{
    public UserNotFoundException(String message)
    {
        super(message);
    }
}

//***************************************************************************************