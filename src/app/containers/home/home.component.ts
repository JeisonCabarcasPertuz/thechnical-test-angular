import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { UsersService } from '../../services/users.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { IUser } from '../../core/interfaces/user.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavbarComponent,
    MatSlideToggleModule,
    MatTableModule,
    MatPaginatorModule,
    CommonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit,AfterViewInit  {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource = new MatTableDataSource<IUser>([]);
  displayedColumns: string[] = ['id', 'name', 'email', 'gender', 'status'];

  constructor(private _usersService:UsersService){}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel="Items por página";
    this.paginator._intl.nextPageLabel="Siguiente";
    this.paginator._intl.lastPageLabel="Última página";
    this.paginator._intl.previousPageLabel="Anterior";
    this.paginator._intl.firstPageLabel="Primera página";
  }

  ngOnInit(): void {
    this._usersService.getUsers().subscribe(response=>{
      console.log('Response: ',response)
      this.dataSource.data = response.data;
    })
  }

}
