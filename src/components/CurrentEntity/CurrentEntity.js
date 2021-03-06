import { inject, observer } from "mobx-react";
import React from "react";
import { LsSettings, LsTrash } from "../../assets/icons";
import { Button } from "../../common/Button/Button";
import { confirm } from "../../common/Modal/Modal";
import { Space } from "../../common/Space/Space";
import { Tooltip } from "../../common/Tooltip/Tooltip";
import { Block, Elem } from "../../utils/bem";
import { AnnotationHistory } from "./AnnotationHistory";
import { Controls } from "./Controls";
import "./CurrentEntity.styl";
import { HistoryActions } from "./HistoryActions";
import { DraftPanel } from "../DraftPanel/DraftPanel";
import { GroundTruth } from "./GroundTruth";

const injector = inject('store');

export const CurrentEntity = injector(observer(({
  store,
  entity,
  canDelete = true,
  showControls = true,
  showHistory = true,
  showGroundTruth = false,
}) => {
  const isPrediction = entity?.type === 'prediction';
  const saved = !entity.userGenerate || entity.sentUserGenerate;

  return entity ? (
    <Block name="annotation" onClick={e => e.stopPropagation()}>
      <Elem name="info" tag={Space} spread>
        <Space size="small">
          ID: {store.task.id}
          {/*ID: {entity.id || entity.pk}*/}
          {/*{showGroundTruth && <GroundTruth entity={entity}/>}*/}
        </Space>

        {store.hasInterface("annotations:add-new") && saved && (
          <Tooltip title={`创建${entity.type}的副本`}>
            <Button size="small" look="ghost" onClick={(ev) => {
              ev.preventDefault();

              const cs = store.annotationStore;
              const c = cs.addAnnotationFromPrediction(entity);

              // this is here because otherwise React doesn't re-render the change in the tree
              window.setTimeout(function() {
                store.annotationStore.selectAnnotation(c.id);
              }, 50);
            }}>
              创建副本
            </Button>
          </Tooltip>
        )}
      </Elem>

      <Space spread style={{ margin: "8px 0" }}>
        {!isPrediction ? (
          <HistoryActions
            history={entity.history}
          />
        ) : (<div/>)}

        <Space size="small" align="flex-end" collapsed>
          {canDelete && (
            <Tooltip title="删除所有标注并提交">
              <Button
                icon={<LsTrash />}
                look="danger"
                type="text"
                aria-label="Delete"
                onClick={() => {
                  confirm({
                    title: "删除标注信息",
                    body: "此操作不可撤销",
                    buttonLook: "destructive",
                    cancelText: '取消',
                    okText: "确定",
                    onOk: () => entity.list.deleteAnnotation(entity),
                  });
                }}
                style={{
                  height: 36,
                  width: 36,
                  padding: 0,
                }}
              />
            </Tooltip>
          )}
          <Button
            icon={<LsSettings/>}
            type="text"
            aria-label="Settings"
            onClick={() => store.toggleSettings()}
            style={{
              height: 36,
              width: 36,
              padding: 0,
            }}
          />
        </Space>
      </Space>

      {showControls && (store.hasInterface("review") || !isPrediction) && (
        <Controls annotation={entity}/>
      )}

      <DraftPanel item={entity} />

      {showHistory && !entity.userGenerate && (
        <AnnotationHistory/>
      )}
    </Block>
  ) : null;
}));
