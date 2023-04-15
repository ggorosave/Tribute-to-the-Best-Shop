import React from "react";
import { IconButton } from "@chakra-ui/react";
import { BiMenu } from "react-icons/bi";

const MenuIconButton = React.forwardRef((props, ref) => {

    return (
        <IconButton
            ref={ref}
            icon={<BiMenu />}
            {...props}
            // colorScheme="primary"
            borderRadius={0}
        />
    )
});


export default MenuIconButton;