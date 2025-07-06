import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendedorPerfilComponent } from './vendedor-perfil.component';

describe('VendedorPerfilComponent', () => {
  let component: VendedorPerfilComponent;
  let fixture: ComponentFixture<VendedorPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendedorPerfilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendedorPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
