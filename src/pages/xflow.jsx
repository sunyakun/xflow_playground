import {
    XFlow, XFlowCanvas, CanvasScaleToolbar, createGraphConfig, XFlowGraphCommands,
    XFlowNodeCommands, CanvasMiniMap, JsonSchemaForm, NsJsonSchemaForm
} from '@antv/xflow'
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

    if (!args) {
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
            },
        })
        await app.executeCommand(XFlowGraphCommands.GRAPH_ZOOM.id, {
            factor: 'real',
        })
        await app.executeCommand(XFlowNodeCommands.CENTER_NODE.id, {nodeConfig: {id: 'root'}})
        // await app.executeCommand(XFlowGraphCommands.GRAPH_RENDER.id, {
        //     graphData: {
        //         nodes: [
        //             { id: 'root1', x:100, y: 100, width: 150, height: 40, renderKey: 'Node', label: 'Node' },
        //             { id: 'down1', x:100, y: 200, width: 150, height: 40, renderKey: 'Node', label: 'Node' },
        //             { id: 'down2', x:100, y: 300, width: 150, height: 40, renderKey: 'Node', label: 'Node' },
        //             { id: 'down3', x:100, y: 400, width: 150, height: 40, renderKey: 'Node', label: 'Node' },
        //         ],
        //         edges: []
        //     }
        // })
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
        <XFlow onLoad={ onLoad } className='xflow-workspace'>
            <XFlowCanvas config={ useGraphConfig() }>
                {/* <CanvasMiniMap />
                <CanvasScaleToolbar position={{ top: 0, left: 0}}/> */}
                {/* <JsonSchemaForm className='xflow-jsonschema-form'
                    formSchemaService={ formSchemaService }
                /> */}
            </XFlowCanvas>
        </XFlow>
    );
}
