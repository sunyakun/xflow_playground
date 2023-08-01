import {
    XFlow, XFlowCanvas, CanvasScaleToolbar, createGraphConfig, XFlowGraphCommands,
    XFlowNodeCommands, CanvasMiniMap, JsonSchemaForm, NsJsonSchemaForm,
    NsGraphStatusCommand,
    NsGraph
} from '@antv/xflow'
import { Row, Col } from "antd"
import { Node } from './node'
import "./xflow.less"
import { useRef } from 'react'

async function formSchemaService(args) {
    let emptyForm = {
        tabs: [
            {
                name: 'Node Config',
                groups: []
            }
        ]
    }

    if (!args || args.targetType != 'node') {
        return emptyForm
    }

    let form = emptyForm
    form.tabs[0].groups = [
        {
            name: 'configuration',
            controls: [
                {
                    name: 'YAML',
                    label: 'YAML',
                    shape: NsJsonSchemaForm.ControlShape.TEXTAREA,
                    value: '',
                }
            ]
        }
    ]

    return form
}

export default function CustomXFlow() {
    const onLoad = async app => {
        await app.executeCommand(XFlowGraphCommands.GRAPH_LAYOUT.id, {
            layoutType: 'dagre',
            layoutOptions: {
                type: 'dagre',
                /** 布局方向 */
                rankdir: 'TB',
                /** 节点间距 */
                nodesep: 60,
                /** 层间距 */
                ranksep: 30,
            },
            graphData: {nodes:[], edges: []}
        })

        await app.executeCommand(XFlowNodeCommands.ADD_NODE.id, {
            nodeConfig: {
              id: 'root',
              x: 0,
              y: 500,
              label: 'root',
              renderKey: 'Node',
              width: 150,
              height: 40,
              status: NsGraphStatusCommand.StatusEnum.PROCESSING,
              ports: [
                    {
                        id: 'root-input-port1',
                        type: NsGraph.AnchorType.INPUT,
                        group: NsGraph.AnchorGroup.TOP,
                        tooltip: 'INPUT'
                    }
                ]
            },
        })
        await app.executeCommand(XFlowNodeCommands.ADD_NODE.id, {
            nodeConfig: {
                id: 'down',
                x: 0,
                y: 600,
                label: 'down',
                renderKey: 'Node',
                width: 150,
                height: 40,
                status: NsGraphStatusCommand.StatusEnum.DEFAULT,
                ports: [
                    {
                        id: 'down-output-port1',
                        type: NsGraph.AnchorType.OUTPUT,
                        group: NsGraph.AnchorGroup.BOTTOM,
                        tooltip: 'OUTPUT'
                    },
                ]
            },
        })
        await app.executeCommand(XFlowGraphCommands.GRAPH_ZOOM.id, {
            factor: 'real',
        })
        await app.executeCommand(XFlowNodeCommands.CENTER_NODE.id, {nodeConfig: {id: 'root'}})
    }

    const useGraphConfig = createGraphConfig(config => {
        config.setX6Config({
            height: 512,
            grid: {
                visible: true,
            },
            scaling: {
                min: 0.5,
                max: 3,
            },
            mousewheel: {
                enabled: true,
            },
            background: {},
            snapline: {
                enabled: false,
            },
        })
        config.setNodeRender('Node', Node)
    })

    return (
        <Row>
            <Col span={24}>
                <XFlow onLoad={ onLoad } className='xflow-workspace'>
                    <XFlowCanvas config={ useGraphConfig() }>
                        <CanvasMiniMap position={{ top: 20, left: 20 }}/>
                        <CanvasScaleToolbar position={{ top: 10, right: 360}}/>
                        <JsonSchemaForm className='xflow-jsonschema-form'
                            style={{ backgroundColor: 'white' }}
                            formSchemaService={ formSchemaService }
                            position={{ top: 0, right: 0, width: 350, height: 512}}
                        />
                    </XFlowCanvas>
                </XFlow>
            </Col>
        </Row>
    );
}
