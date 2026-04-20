---

layout: default  
title: VRCHaptics
tagline: 更新履歴</br><a href="http://translate.google.com/translate?hl=ja&sl=auto&tl=en&u=http%3A%2F%2Fgithub.teruaki-tsubokura.com%2Fvrchaptics%2Fchangelog" style="color:white;text-decoration:underline;">English(Google Translate)</a>
---

# 更新履歴

* [v0.2.0](#v020)

-----

## v0.2.0

### VRCHapticsアプリ

#### 追加

* 対応デバイスに「Tactosy for Hands」「Tactosy for Feet」が追加されました。

#### 修正

* 使用しているbHaptics Pluginのバージョンを更新(1.4.14)。  
  これにより新しいbHapticsデバイス(Tactosy2系列)で接続状態が取得できなかった不具合が修正。
* VRCHapticsで使用しているbHaptics Pluginのバージョンの不具合で、新しいbHapticsデバイス(Tactosy2系列)の接続状態が取得できない場合がある。(次回更新で修正予定)

#### 削除

* 「Use Depth」チェックボックスを削除。  
  (開発当初に入れていた、タッチ深度に応じて振動強度を変える機能ですが、パーティクル等で動作しない為、一旦消します。)

### VRCHaptics用Unityアセット (v0.1.0)

#### 追加

* 接触判定エリアをローカル表示へ。
* StreamCamera使用中も、自分がカメラ内に写っていればVRCHapticsのヒットエリアが表示されるようになりました。
* 言語切替ボタンを追加(日本語・英語)
* ドキュメントへのリンクを追加。
* アバターセットアップのエラーチェック機能とエラーメッセージを追加。
* 触覚Prefab追加時に、3Dモデルのおおよその位置にObjectが移動されるように。

#### 修正

* Unity2018でVRCHapticsHelperのセットアップが正しく動作しなかった問題を修正。
* VRChatのUnity2018対応に伴い、触覚用の3Dモデルやカメラの追従をJoint方式→Constraint方式に変更。 
* VRChatのUnity2018対応に伴い、人が多く集まるワールド等でシェーダーキーワード256個制限関連の不具合が出る事があった為、タッチ判定用シェーダーをシェーダーキーワードを使わない方式へ更新。
* SteamVRのHMD解像度を変更すると赤黒ヒットエリアの表示サイズが変わってしまっていた為、計算式を見直して表示サイズが変わらないように修正。  
  これにより、ほとんどの場合VRCHapticsのClipPositionはデフォルト設定のままで正しく動作するようになりました。
* VRCHaptics-Unityというフォルダ名をVRCHapticsAssetsに変更。

#### 削除

* VRCHaptics_HeadJoint.prefabを削除（VRCHaptics_HeadConstraint.prefabに引き継ぎ）



