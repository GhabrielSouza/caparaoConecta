import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

import { VagasService } from '../../../../../services/vagas.service';
import { IVagas } from '../../../interface/IVagas.interface';

@Component({
    selector: 'app-dashboard-tabela',
    templateUrl: 'dashboard-tabela.component.html',
    standalone: true,
    imports: [TableModule, CommonModule],
    providers: []
})

export class DashboardTabelaComponent {
    vagas!: IVagas[];

    constructor(private vagasService: VagasService) {}

    ngOnInit() {
        this.vagasService.getVagas();
    }
}