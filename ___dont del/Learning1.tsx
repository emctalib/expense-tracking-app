/*
import React from 'react';

export const Learning1 = () => {
    return <div></div>;
};
*/
import { Button, Dialog, Flex, FlexItem, TextArea, Text } from '@fluentui/react-northstar';
import React from "react";
import { Strings } from "shared/localization/strings";
import { gap, padding } from 'shared/localization/Helper';


interface Props {
    showPopUp: boolean;
    saveChangeCallback: (value: material) => void;
    onCloseCallback: () => void;


}

interface material {
    materialName: string;
    link: string;
    scope: string;

}

type valueType = "material" | "link" | "scope"

interface Stats {
    value: material
}

export class AddTopicMetrial extends React.Component<Props, Stats> {

    constructor(props: Props) {
        super(props);
        this.state = { value: undefined }
    }
    render() {
        if (!this.props.showPopUp) {
            return <></>;
        }
        const bind = (e, type: valueType) => {
            if (type == "material")
                this.setState({ value: Object.assign({}, this.state.value, { materialName: e.target.value }) })
            else if (type == "link")
                this.setState({ value: Object.assign({}, this.state.value, { link: e.target.value }) })
            else if (type == "scope")
                this.setState({ value: Object.assign({}, this.state.value, { scope: e.target.value }) })
        }


        const footer = (trans: Strings) => {

            return (
                <Flex>
                    <FlexItem grow>
                        <Button secondary content={trans.close || "save"} />
                    </FlexItem>
                    <FlexItem push>
                        <Button secondary content={trans.save || "close"} />
                    </FlexItem>
                </Flex>
            )
        };

        return (
            <Dialog
                open={this.props.showPopUp}
                onCancel={() => { return false }}

                content={<>
                    <Flex gap={gap} padding={padding}>
                        <FlexItem grow >
                            <Text content="Materiale navn" />
                        </FlexItem>
                        <FlexItem grow >
                            <Text content="Link" />
                        </FlexItem>
                    </Flex>
                    <Flex gap={gap} padding={padding}>

                        <FlexItem grow >
                            <TextArea fluid value={this.state.value?.materialName} onChange={(e) => bind(e, "material")}></TextArea>
                        </FlexItem>
                        <FlexItem grow>
                            <TextArea fluid value={this.state.value?.link} onChange={(e) => bind(e, "link")}></TextArea>
                        </FlexItem>


                    </Flex>
                    <Flex gap={gap} padding={padding}>
                        <FlexItem grow >
                            <Text content="Omfang" />
                        </FlexItem></Flex>

                    <Flex gap={gap} padding={padding}>

                        <FlexItem grow>
                            <TextArea fluid value={this.state.value?.scope} onChange={(e) => bind(e, "scope")}></TextArea>
                        </FlexItem>

                    </Flex>


                </>}
                footer={<>
                    <Flex>
                        <FlexItem grow>
                            <Button secondary content={"save"} onClick={() => this.props.saveChangeCallback(this.state.value)} />
                        </FlexItem>
                        <FlexItem push>
                            <Button secondary content={"close"} onClick={() => { this.setState({ value: undefined }); this.props.onCloseCallback() }} />
                        </FlexItem>
                    </Flex></>
                }


                styles={{ justifySelf: "unset" }}
                className="PopupDialogs"

            />)
    }
}