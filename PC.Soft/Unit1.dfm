object Form1: TForm1
  Left = 0
  Top = 0
  Caption = 'BeeMonitor - PC - virusz'
  ClientHeight = 355
  ClientWidth = 463
  Color = clBtnFace
  Font.Charset = DEFAULT_CHARSET
  Font.Color = clWindowText
  Font.Height = -11
  Font.Name = 'Tahoma'
  Font.Style = []
  OldCreateOrder = False
  OnCreate = FormCreate
  PixelsPerInch = 96
  TextHeight = 13
  object Label1: TLabel
    Left = 24
    Top = 252
    Width = 114
    Height = 64
    Caption = 'load'
    Font.Charset = DEFAULT_CHARSET
    Font.Color = clWindowText
    Font.Height = -53
    Font.Name = 'Tahoma'
    Font.Style = [fsBold]
    ParentFont = False
  end
  object Button1: TButton
    Left = 24
    Top = 16
    Width = 75
    Height = 25
    Caption = 'Conectare'
    TabOrder = 0
    OnClick = Button1Click
  end
  object Button2: TButton
    Left = 24
    Top = 47
    Width = 75
    Height = 25
    Caption = 'Btn'
    TabOrder = 1
    OnClick = Button2Click
  end
  object Button3: TButton
    Left = 24
    Top = 78
    Width = 75
    Height = 25
    Caption = 'Button3'
    TabOrder = 2
  end
  object Button4: TButton
    Left = 24
    Top = 109
    Width = 75
    Height = 25
    Caption = 'Button4'
    TabOrder = 3
  end
  object LabeledEdit1: TLabeledEdit
    Left = 136
    Top = 20
    Width = 121
    Height = 21
    EditLabel.Width = 66
    EditLabel.Height = 13
    EditLabel.Caption = 'Temperatura:'
    TabOrder = 4
  end
  object LabeledEdit2: TLabeledEdit
    Left = 136
    Top = 64
    Width = 121
    Height = 21
    EditLabel.Width = 45
    EditLabel.Height = 13
    EditLabel.Caption = 'Umiditate'
    TabOrder = 5
  end
  object LabeledEdit3: TLabeledEdit
    Left = 136
    Top = 106
    Width = 121
    Height = 21
    EditLabel.Width = 43
    EditLabel.Height = 13
    EditLabel.Caption = 'Greutate'
    TabOrder = 6
  end
  object ListBox1: TListBox
    Left = 280
    Top = 20
    Width = 121
    Height = 245
    ItemHeight = 13
    TabOrder = 7
  end
  object AdvFirebaseObjectDatabase1: TAdvFirebaseObjectDatabase
    Agent = 'Mozilla/5.001 (windows; U; NT4.0; en-US; rv:1.0) Gecko/25250101'
    App.CallBackURL = 'http://127.0.0.1:8888/'
    App.CallBackPort = 8888
    App.Name = 'beemonitor-1ffa9'
    App.Key = 
      '1069439317883-hq7sb1t7csq2di8916kvevmql83cmrom.apps.googleuserco' +
      'ntent.com'
    App.Secret = 'Q0ipAHDdEW2wvWxaYp8wQd5w'
    PersistTokens.Location = plIniFile
    Scopes.Strings = (
      'https://www.googleapis.com/auth/userinfo.profile'
      'https://www.googleapis.com/auth/userinfo.email'
      'https://www.googleapis.com/auth/gmail.send'
      'https://www.googleapis.com/auth/userinfo.email'
      'https://www.googleapis.com/auth/firebase.database')
    AuthFormSettings.Caption = 'Authorize'
    AuthFormSettings.Width = 900
    AuthFormSettings.Height = 600
    ExternalBrowser = False
    Left = 72
    Top = 184
  end
  object Timer1: TTimer
    Interval = 10000
    OnTimer = Timer1Timer
    Left = 24
    Top = 184
  end
end
