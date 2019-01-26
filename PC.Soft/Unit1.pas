unit Unit1;

interface

uses
  Winapi.Windows, Winapi.Messages, System.SysUtils, System.Variants, System.Classes, Vcl.Graphics,
  Vcl.Controls, Vcl.Forms, Vcl.Dialogs, Vcl.StdCtrls,
  System.Generics.Collections, CloudBase, CloudBaseWin, CloudCustomGoogle,
  CloudGoogleWin, CloudCustomFirebase, CloudCustomObjectFirebase, CloudFirebase,
  Vcl.ExtCtrls;




type
  TForm1 = class(TForm)
    AdvFirebaseObjectDatabase1: TAdvFirebaseObjectDatabase;
    Button1: TButton;
    Button2: TButton;
    Button3: TButton;
    Button4: TButton;
    LabeledEdit1: TLabeledEdit;
    LabeledEdit2: TLabeledEdit;
    LabeledEdit3: TLabeledEdit;
    Timer1: TTimer;
    Label1: TLabel;
    ListBox1: TListBox;
    procedure Button1Click(Sender: TObject);
    procedure Button2Click(Sender: TObject);

    procedure FormCreate(Sender: TObject);
    procedure Timer1Timer(Sender: TObject);


    end;
    TFirebaseBeeMonitor = class(TFirebaseObject)
    private
      FName: string;
      FStreet: string;
      FZIP: integer;
      FDoB: TDate;
      FCity: string;
       lst: TFirebaseObjectList;

    public
//      constructor Create; override;
 //     destructor Destroy; override;
    published
      property Name: string read FName write FName;
      property Street: string read FStreet write FStreet;
      property City: string read FCity write FCity;
      property ZIP: integer read FZIP write FZIP;
      property DoB: TDate read FDoB write FDoB;
    end;

var
  Form1: TForm1;

implementation


{$R *.dfm}

procedure TForm1.Button1Click(Sender: TObject);
begin
AdvFirebaseObjectDatabase1.DatabaseName := 'beemonitor-1ffa9';
//AdvFirebaseObjectDatabase1.TableName := '1240';
AdvFirebaseObjectDatabase1.Connect;

end;

procedure TForm1.Button2Click(Sender: TObject);
var
  cst: TFireBaseBeeMonitor;
begin
  cst := TFireBaseBeeMonitor.Create;
  try
    cst.Name := 'Bill Gates';
    cst.Street := 'Microsoft Av';
    cst.ZIP := 2123;
    cst.City := 'Redmond';
    cst.DoB := EncodeDate(1969,04,18);
    cst.ID := '1240';
    AdvFirebaseObjectDatabase1.InsertObject(cst);
  finally
    cst.Free;
  end;

end;




procedure TForm1.FormCreate(Sender: TObject);
begin

RegisterClass(TFirebaseBeeMonitor);


end;

procedure TForm1.Timer1Timer(Sender: TObject);
var
  temp, umid,kg : string;
begin
temp:= stringreplace(AdvFirebaseObjectDatabase1.Read('Temperatura'), '"', '',
                          [rfReplaceAll, rfIgnoreCase]);
LabeledEdit1.Text:=temp;
kg:= stringreplace(AdvFirebaseObjectDatabase1.Read('Greutate'), '"', '',
                          [rfReplaceAll, rfIgnoreCase]);
LabeledEdit3.Text:=kg;
umid:= stringreplace(AdvFirebaseObjectDatabase1.Read('Umiditate'), '"', '',
                          [rfReplaceAll, rfIgnoreCase]);
LabeledEdit2.Text:=umid;

Label1.Caption:=kg+'Kg';
end;

end.
