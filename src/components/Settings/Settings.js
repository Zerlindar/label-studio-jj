import React from "react";
import { Modal, Checkbox, Tabs, Table } from "antd";
import { observer } from "mobx-react";

import { Hotkey } from "../../core/Hotkey";

const HotkeysDescription = () => {
  const descr = Hotkey.keysDescipritions();
  const columns = [
    { title: "按键", dataIndex: "key", key: "key" },
    { title: "描述", dataIndex: "descr", key: "descr" },
  ];

  const data = Object.keys(descr)
    .filter(k => descr[k])
    .map(k => new Object({ key: k, descr: descr[k] })); // eslint-disable-line no-new-object

  return <Table columns={columns} dataSource={data} size="small" />;
};

export default observer(({ store }) => {
  return (
    <Modal
      visible={store.showingSettings}
      title="Settings"
      bodyStyle={{ paddingTop: "0" }}
      footer=""
      onCancel={store.toggleSettings}
    >
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="General" key="1">
          <Checkbox
            checked={store.settings.enableHotkeys}
            onChange={() => {
              store.settings.toggleHotkeys();
            }}
          >
            使用标注快捷键
          </Checkbox>
          <br />
          <Checkbox
            checked={store.settings.enableTooltips}
            onChange={() => {
              store.settings.toggleTooltips();
            }}
          >
            显示快捷键提示
          </Checkbox>
          <br />
          <Checkbox
            checked={store.settings.enableLabelTooltips}
            onChange={() => {
              store.settings.toggleLabelTooltips();
            }}
          >
            显示标签快捷工具提示
          </Checkbox>
          <br />
          <Checkbox
            checked={store.settings.showLabels}
            onChange={() => {
              store.settings.toggleShowLabels();
            }}
          >
            显示区域内的标签
          </Checkbox>
          {/* <br/> */}
          {/* <Checkbox */}
          {/*   value="Show scores inside the regions" */}
          {/*   defaultChecked={store.settings.showScore} */}
          {/*   onChange={() => { */}
          {/*     store.settings.toggleShowScore(); */}
          {/*   }} */}
          {/* > */}
          {/*   Show scores inside the regions */}
          {/* </Checkbox> */}

          <br />
          <Checkbox
            checked={store.settings.continuousLabeling}
            onChange={() => {
              store.settings.toggleContinuousLabeling();
            }}
          >
            在创建区域后保持选中标签
          </Checkbox>

          <br />
          <Checkbox checked={store.settings.selectAfterCreate} onChange={store.settings.toggleSelectAfterCreate}>
            创建后选择区域
          </Checkbox>

          <br />
          <Checkbox checked={store.settings.showLineNumbers} onChange={store.settings.toggleShowLineNumbers}>
            显示文本的行号
          </Checkbox>

          {/* <br /> */}
          {/* <Checkbox */}
          {/*   value="Enable auto-save" */}
          {/*   defaultChecked={store.settings.enableAutoSave} */}
          {/*   onChange={() => { */}
          {/*     store.settings.toggleAutoSave(); */}
          {/*   }} */}
          {/* > */}
          {/*   Enable auto-save */}

          {/* </Checkbox> */}
          {/* { store.settings.enableAutoSave && */}
          {/*   <div style={{ marginLeft: "1.7em" }}> */}
          {/*     Save every <InputNumber size="small" min={5} max={120} /> seconds */}
          {/*   </div> } */}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Hotkeys" key="2">
          <HotkeysDescription />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Layout" key="3">
          <Checkbox
            checked={store.settings.bottomSidePanel}
            onChange={() => {
              store.settings.toggleBottomSP();
            }}
          >
            把侧边栏移到底部
          </Checkbox>

          <br />
          <Checkbox checked={store.settings.displayLabelsByDefault} onChange={store.settings.toggleSidepanelModel}>
            在结果面板中默认显示标签
          </Checkbox>

          <br />
          <Checkbox
            value="Show Annotations panel"
            defaultChecked={store.settings.showAnnotationsPanel}
            onChange={() => {
              store.settings.toggleAnnotationsPanel();
            }}
          >
            显示标注面板
          </Checkbox>
          {/*<br />*/}
          {/*<Checkbox*/}
          {/*value="Show Predictions panel"*/}
          {/*defaultChecked={store.settings.showPredictionsPanel}*/}
          {/*onChange={() => {*/}
          {/*store.settings.togglePredictionsPanel();*/}
          {/*}}*/}
          {/*>*/}
          {/*Show Predictions panel*/}
          {/*</Checkbox>*/}

          {/* <br/> */}
          {/* <Checkbox */}
          {/*   value="Show image in fullsize" */}
          {/*   defaultChecked={store.settings.imageFullSize} */}
          {/*   onChange={() => { */}
          {/*     store.settings.toggleImageFS(); */}
          {/*   }} */}
          {/* > */}
          {/*   Show image in fullsize */}
          {/* </Checkbox> */}
        </Tabs.TabPane>
      </Tabs>
    </Modal>
  );
});
