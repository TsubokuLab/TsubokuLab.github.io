---
layout: default
title: VRCHaptics
---

![vrchaptics_vrchat](images\vrchaptics_vrchat.jpg)

## ソフトウェア概要

bHaptics社の販売する触覚スーツ(https://www.bhaptics.com/)をVRChat等のソフトと連動して動作させるためのソフトウェア、及びVRChatアバターに設定するためのPrefabとUnityエディター拡張機能。

## 仕組み
①触覚ベストやアームデバイスに接近したオブジェクトをアバターのカメラで撮影し、RenderTextureを画面上の固定位置に表示。
②そのRenderTextureをVRCHapticsアプリで画面キャプチャーし、色情報→デバイスの振動に変換しています。

## 内容物
* VRCHaptics.exe --- アプリ本体
* VRCHaptics_settings.xml --- VRCHapicsの設定ファイル
* VRCHaptics-VRChat.unitypackage --- VRChat用アセットUnityPackage

## VRChat用アセットUnityPackage
VRCHaptics-VRChat
└ Prefabs
  ├ Hidden
  │ ├ VRCHaptics_Vest_hidden.prefab
  │ ├ VRCHaptics_LeftArm_hidden.prefab
  │ ├ VRCHaptics_RightArm_hidden.prefab
  │ └ VRCHaptics_Head_hidden.prefab
  └ Visualized
    ├ VRCHaptics_Vest_visualized.prefab
    ├ VRCHaptics_LeftArm_visualized.prefab
    ├ VRCHaptics_RightArm_visualized.prefab
    └ VRCHaptics_Head_visualized.prefab

### デモ用ワールド
URL:
・ペデスタルやClone Avatar等で同じワールド内に同じアバターが複数存在すると、RenderTextureが共通になってしまい正しく動作しなくなります。１つのペデスタルを利用するのは１人までとして下さい。

## 推奨動作環境
・Windows10
・GPU: Nvidia GeForce GTX1060 以上
・CPU: Intel Core i7 以上

## 使用前の注意事項
元々、触覚スーツbHapticsに非対応のVRChat等のアプリケーションを半ば無理やり対応させている為、動作条件にいくつか制限があります。
以下をご了承の上ご利用下さい。

* ウィンドウキャプチャを使用するためCPUリソースを多く消費します。スペックが不足していたりVRChatの高負荷なワールド・人の多い場所ではVRの動作に影響が出る可能性があります。
* 画面上にタッチ情報を表示するため、VRChatのStreamCameraとの併用ができません。(画面が上書きされてしまう為)
* PostProcessing（主にBloomやColorGrading)が有効のワールドでは誤動作する場合があります。（判定用テクスチャの色が変化してしまうため）
* タッチ位置フィードバック用の触覚デバイスPrefab(Visualized)には、仕様上LocalPlayerレイヤーを描画するカメラを使用しているため、使用者のアバター自身によるタッチ位置も写り込んでしまいます。アバターに両面描画シェーダーを使用していたり複雑な服装を着ている場合は肌や服もタッチ位置として写り込んでしまう可能性があるのでご注意下さい。（振動制御には別の判定用カメラを使用しているので、自分のタッチで振動することはありません。Hidden Prefabを使用している場合も同様に影響ありません。）
* VRモード&フルスクリーン起動での動作を想定しています。フルスクリーンでない場合は、Shiftキーを押しながらVRChatを起動し、Windowedのチェックを外して起動して下さい。また、デスクトップモードで使用する場合はClip Positionの範囲を調整してください。

/*
・判定用カメラの表示レイヤー
UI/UIMenu/LocalPlayer/MirrorReflectionを外す
MirrorReflectionを外さないとLocalPlayerを外していても自分の体のメッシュが反応してしまう。

・プレビュー用のカメラの表示レイヤー
UI/UIMenu/MirrorReflectionを外す
LocalPlayerを外していても自分の体のメッシュが反応してしまう。
*/

## クレジット

VRCHaptics.exeには @hecomi様 の [uWindowCapture] を使用させて頂いています。

* uWindowCapture (MIT)
  https://github.com/hecomi/uWindowCapture

また、アバターセットアップ用のUnityエディタ拡張機能の開発には @izm様 の [UnityWearChangeSupporter] を参考にさせて頂きました。

* UnityWearChangeSupporter (MIT)
  https://neon-izm.booth.pm/items/1273588