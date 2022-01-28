import { Button, Dialog, Flex, FlexItem, TextArea, Text, Grid } from '@fluentui/react-northstar';
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

                    <>
                        <Flex>
                            <Flex column styles={{ width: '100%', padding: '10px' }}>
                                <FlexItem grow align='center'>
                                    <>
                                        <Text content="Materiale navn" />
                                        <TextArea fluid value={this.state.value?.materialName} onChange={(e) => bind(e, "material")}></TextArea>
                                    </>
                                </FlexItem>




                            </Flex>
                            <Flex column styles={{ width: '100%', padding: '10px' }}>
                                <FlexItem grow >
                                    <>
                                        <Text content="Link" />
                                        <TextArea fluid value={this.state.value?.link} onChange={(e) => bind(e, "link")}></TextArea></>
                                </FlexItem>
                            </Flex>
                        </Flex>

                        <Flex column styles={{ padding: '10px' }}>
                            <FlexItem grow >
                                <>
                                    <Text content="Omfang" />
                                    <TextArea fluid value={this.state.value?.scope} onChange={(e) => bind(e, "scope")}></TextArea></>
                            </FlexItem>
                        </Flex>


                    </>


                </>}
                footer={<>
                    <Flex>
                        <FlexItem  >
                            <Button secondary content={"close"} onClick={() => { this.setState({ value: undefined }); this.props.onCloseCallback() }} />
                        </FlexItem>
                        <FlexItem push  >
                            <Button primary content={"save"} onClick={() => this.props.saveChangeCallback(this.state.value)} />
                        </FlexItem>

                    </Flex></>
                }


                styles={{ justifySelf: "unset" }}
                className="PopupDialogs"

            />)
    }
}