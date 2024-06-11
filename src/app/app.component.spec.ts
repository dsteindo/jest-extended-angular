import { TestBed } from '@angular/core/testing';
import { AppComponent } from '@app/app.component';
import { firstValueFrom } from 'rxjs';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'jest-extended-angular' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('jest-extended-angular');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, jest-extended-angular');
  });

  it('should apply jest-extended matcher', () => {
    expect(true).toBeTrue();
  });

  it('some more testing', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.ngOnInit();
    expect(await firstValueFrom(app.emitter)).toBeFalse();
  });

  it('should call emitter once on ngOnInit', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    jest.spyOn(app.emitter, 'next');
    app.ngOnInit();
    expect(app.emitter.next).toHaveBeenCalledOnceWith(false);
  });
});
