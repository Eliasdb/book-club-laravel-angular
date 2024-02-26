import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { WorkspaceContainer } from './workspace.container';

describe('WorkspaceContainer', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [WorkspaceContainer],
    })
  );

  it('should create the app', () => {
    const fixture = TestBed.createComponent(WorkspaceContainer);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(WorkspaceContainer);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain(
      'book-management app is running!'
    );
  });
});
