
:- dynamic pce_post_expansion_hook/2.
:- multifile pce_post_expansion_hook/2.


delete_a_frame(A) :-
    frame(A, _),
    frame(B, [(a_part_of, A)|_]),
    delete_a_frame(B).
delete_a_frame(A) :-
    frame(A, _),
    frame(B, [(ako, A)|_]),
    delete_a_frame(B).
delete_a_frame(A) :-
    frame(A, B),
    write("SUCCESSFULLY DELETED"),
    retract(frame(A, B)).

save_file(A) :-
    open(A, write, B),
    with_output_to(B, listing),
    close(B).

search([(A, B)|_], A, B) :-
    !.
search([_|A], B, C) :-
    search(A, B, C).

show_all_info(A, B) :-
    frame(A, B).

:- dynamic frame/2.

frame(university, [nil,  (phone, default, "0120 3819100"),  (address, default, "Shiv Nadar University"),  (size, default, "286 acres"),  (stu_strength, default, 2500),  (fac_strength, default, 200)]).
frame(school, [(part_of, university),  (degree_offered, ["B.Tech", "B.Sc", "B.A", "MBA"]),  (teachers, range, 1, 100)]).
frame(staff, [(part_of, university),  (name, default, "John Doe"),  (office, default, "D003")]).
frame(infrastructure, [(part_of, university),  (year, range, 2008, 2019),  (cost, range, 50000, 5000000)]).
frame(soe, [(ako, school),  (labs, range, 1, 50),  (package, default, 800000)]).
frame(sns, [(ako, school),  (labs, range, 1, 100),  (papers, default, 100)]).
frame(shss, [(ako, school),  (exchange_stud, default, 0),  (papers, default, 200)]).
frame(sme, [(ako, school),  (field_trips, default, 0),  (package, default, 600000)]).
frame(department, [(part_of, school),  (students, range, 100, 1000),  (faculty, range, 10, 80)]).
frame(director, [(part_of, school),  (name, default, "John Doe"),  (salary, default, 2000000)]).
frame(head, [(part_of, department),  (name, default, "John Doe"),  (salary, default, 1500000)]).
frame(faculty, [(part_of, department),  (qual, default, "PhD"),  (salary, default, 1000000)]).
frame(student, [(part_of, department),  (name, default, "John Doe"),  (id, default, 1710110165)]).
frame(residential, [(ako, faculty),  (tower_no, default, "T10"),  (house_no, default, "001")]).
frame(guest, [(ako, faculty),  (pickup_from, default, "Airport"),  (weekday, default, "Mon")]).
frame(visiting, [(ako, faculty),  (weekday, ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"])]).
frame(ug, [(ako, student),  (club, default, "Inspiria")]).
frame(pg, [(ako, student),  (prev_deg, default, "B.Tech")]).
frame(admin, [(ako, staff),  (office, default, "D003")]).
frame(cetering, [(ako, staff),  (org, default, "Azure")]).
frame(security, [(ako, staff),  (loc, default, "Main Gate")]).
frame(maintenance, [(ako, staff),  (loc, default, "B Block")]).
frame(housekeeping, [(ako, staff),  (resp, default, "Bathrooms")]).
frame(gardening, [(ako, staff),  (spl, default, "Watering")]).
frame(pa, [(ako, admin),  (pa_to, default, "Rupamanjari Ghosh")]).
frame(ea, [(ako, admin),  (dept, default, "President's Office")]).
frame(finance, [(ako, admin),  (spl, default, "Employee Salaries")]).
frame(transport, [(ako, admin),  (org, default, "Pappu Travels")]).
frame(chancellor, [(ako, admin),  (days_on_campus, default, 1)]).
frame(vc, [(ako, admin),  (days_on_campus, default, 5)]).
frame(dean, [(ako, admin),  (report_to, default, "Vice Chancellor")]).
frame(supervisor, [(ako, security),  (team, range, 5, 150)]).
frame(guard, [(ako, security),  (company, default, "XYZ")]).
frame(bouncer, [(ako, security),  (from, default, "Haryana")]).
frame(plumber, [(ako, maintenance),  (exp, default, 5)]).
frame(electrician, [(ako, maintenance),  (exp, default, 8)]).
frame(carpenter, [(ako, maintenance),  (spl, ["Carving", "Chopping", "Repair"])]).
frame(housing, [(ako, infrastructure),  (type, ["AC", "Non-AC"])]).
frame(library, [(ako, infrastructure),  (books, range, 1000, 1000000)]).
frame(sports, [(ako, infrastructure),  (type, ["Indoor", "Outdoor"])]).
frame(acad_block, [(ako, infrastructure),  (floors, default, 3)]).
frame(food, [(ako, infrastructure),  (cuisine, default, "Indian")]).
frame(hostel, [(ako, housing),  (gender, ["Girls", "Boys", "Co-Ed"])]).
frame(fac_housing, [(ako, housing),  (type, ["Paid", "Free"])]).
frame(field, [(ako, sports),  (surface, ["Grass", "Turf"])]).
frame(court, [(ako, sports),  (shoes, ["Marking", "Non-Marking"])]).
frame(dining, [(ako, food),  (caterer, default, "Azure")]).
frame(foodstall, [(ako, food),  (type, ["Food", "Beverages"])]).
frame(restaurant, [(ako, food),  (caterer, default, "Azure")]).
frame(kabir, [(inst, ug),  (club, value, "Inspiria"),  (name, value, "Kabir Kanha Arora"),  (id, value, 1710110165)]).
frame(kabir, [inst(ug), club(value, "Inspiria"), name(value, "Kabir Kanha Arora"), id(value, 1710110145)]).
frame(kabir, [inst(ug), club(value, "Inspiria"), name(value, "Kabir Kanha Arora"), id(value, 1710110145)]).
frame(kka, [(inst, ug),  (name, "Anirudh")]).

:- dynamic pce_pre_expansion_hook/2.
:- multifile pce_pre_expansion_hook/2.

pce_pre_expansion_hook(In, Out) :-
    emacs_extend:emacs_expansion(In, Out).

display_all(A, B) :-
    frame(A, B).

:- multifile prolog_predicate_name/2.

prolog_predicate_name(pce_principal:send_implementation(Id0, _, _), Id) :-
    pce_portray:
    (   method_from_id(Id0, SG),
        atom_from_method(SG, Id)
    ).
prolog_predicate_name(pce_principal:get_implementation(Id0, _, _, _), Id) :-
    pce_portray:
    (   method_from_id(Id0, SG),
        atom_from_method(SG, Id)
    ).

:- dynamic prolog_exception_hook/4.
:- multifile prolog_exception_hook/4.

prolog_exception_hook(error(E, context(Ctx0, Msg)), error(E, context(prolog_stack(Stack), Msg)), Fr, GuardSpec) :-
    prolog_stack:
    (   current_prolog_flag(backtrace, true),
        \+ is_stack(Ctx0, _Frames),
        (   atom(GuardSpec)
        ->  debug(backtrace,
                  'Got uncaught (guard = ~q) exception ~p (Ctx0=~p)',
                  [GuardSpec, E, Ctx0]),
            stack_guard(GuardSpec),
            Guard=GuardSpec
        ;   prolog_frame_attribute(GuardSpec,
                                   predicate_indicator,
                                   Guard),
            debug(backtrace,
                  'Got exception ~p (Ctx0=~p, Catcher=~p)',
                  [E, Ctx0, Guard]),
            stack_guard(Guard)
        ),
        (   current_prolog_flag(backtrace_depth, Depth)
        ->  Depth>0
        ;   Depth=20
        ),
        get_prolog_backtrace(Depth,
                             Stack0,
                             [frame(Fr), guard(Guard)]),
        debug(backtrace, 'Stack = ~p', [Stack0]),
        clean_stack(Stack0, Stack1),
        join_stacks(Ctx0, Stack1, Stack)
    ).

find_a_frame(A, C, D) :-
    frame(A, B),
    search(B, C, D).
find_a_frame(A, C, D) :-
    frame(A, [(ako, B)|_]),
    find_a_frame(B, C, D).
find_a_frame(A, C, D) :-
    frame(A, [(a_part_of, B)|_]),
    find_a_frame(B, C, D).

:- multifile url_path/2.

url_path(swipl, 'http://www.swi-prolog.org').
url_path(swipl_book, 'http://books.google.nl/books/about/SWI_Prolog_Reference_Manual_6_2_2.html?id=q6R3Q3B-VC4C&redir_esc=y').
url_path(swipl_faq, swipl('FAQ')).
url_path(swipl_man, swipl('pldoc/doc_for?object=manual')).
url_path(swipl_mail, swipl('Mailinglist.html')).
url_path(swipl_download, swipl('Download.html')).
url_path(swipl_pack, swipl('pack/list')).
url_path(swipl_bugs, swipl('bugzilla/')).
url_path(swipl_quick, swipl('man/quickstart.html')).

:- multifile prolog_clause_name/2.

prolog_clause_name(Ref, Name) :-
    pce_portray:
    (   clause(Head, _, Ref),
        user:prolog_predicate_name(Head, Name)
    ).

insert_a_frame(A, _, _) :-
    frame(A, _),
    !,
    write("Frame already exists, CANNOT INSERT").
insert_a_frame(B, A, C) :-
    frame(A, _),
    assertz(frame(B, C)),
    write("ADDED SUCCESSFULLY").
insert_a_frame(_, _, _) :-
    write("Parent not found, CANNOT INSERT").

:- thread_local thread_message_hook/3.
:- dynamic thread_message_hook/3.
:- volatile thread_message_hook/3.

