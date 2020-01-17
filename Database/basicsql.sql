/*create database MihirDB;
create table Albumsa( Album int,
            AlbumName Varchar(255),
            ReleaseDate dateTime,
            ArtistId int, Genre int );
insert into Albumsa
values( 13,'the godfather',11/12/1998,9,5)
select * from Albumsa
alter table Albumsa alter column Genre VARCHAR(255)
update Albumsa set Genre='Hip Hop' where Album=13



create table individuals ( Individualid int not Null,
 Firstname varchar(255), Lastname varchar(255), Username Varchar(255))
insert into individuals values(1,'fred','flinstone','freddo')
insert into individuals values(2,'Homer','simpson','homey')
insert into individuals values(3,'Homer','Brown','notsofamous')
insert into individuals values(4,'Ozzy','Ozzbourne','sabbath')
insert into individuals values(5,'Homer','Gain','noplacelike')

select * from individuals
alter table individuals ADD Primary key(Individualid)

create table occupation ( occupationid int not Null,
 Individualid int not Null, 
 jobtitle Varchar(255) Foreign key (Individualid) references individuals(Individualid))
insert into occupation values(1,1,'Engineer')
insert into occupation values(2,2,'Accountant')
insert into occupation values(3,3,'Cleaner')
insert into occupation values(4,4,'Attorney')
insert into occupation values(5,5,'Sales Executive')

select * from occupation

SELECT Individualid, Lastname, Username 
FROM individuals
WHERE Firstname = 'Homer';

select * from individuals
where Firstname = 'Homer'
and Lastname = 'Brown';

select individuals
where Firstname = 'Homer'
or Lastname = 'Ozzbourne';

select * from individuals
order by Lastname;

select * from individuals
order by Lastname DESC;

select * from individuals
order by Firstname, Lastname;

select top 3 * from individuals;

select distinct(Firstname) from individuals;

select * from occupation where jobtitle in ('Engineer','Attorney','Accountant')

create table publisherAA( Individualid int not Null, 
 Accesslevel varchar(255) Foreign key (Individualid) references individuals(Individualid))
insert into publisherAA values(1,'Administrator')
insert into publisherAA values(2,'contributor')
insert into publisherAA values(3,'contributor')
insert into publisherAA values(4,'contributor')

select Individualid,Firstname from individuals where Individualid in (select Individualid from publisherAA where Accesslevel = 'contributor')


select o.jobtitle from individuals as i , occupation as o where i.Firstname='homer' order by o.jobtitle


select * from individuals inner join publisherAA on individuals.Individualid=publisherAA.Individualid
select * from individuals left join publisherAA on individuals.Individualid=publisherAA.Individualid
select * from individuals right join publisherAA on individuals.Individualid=publisherAA.Individualid
select * from individuals full join publisherAA on individuals.Individualid=publisherAA.Individualid


insert into individuals values ( 6, 'Benny', 'Hill', 'hillbenny' )

update individuals set Username='Mihir' where Individualid=6
*/