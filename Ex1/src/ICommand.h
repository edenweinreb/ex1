#ifndef ICOMMAND_H
#define ICOMMAND_H

// TODO: Merge with AE-25 Branch
// Abstract interface for all system commands
class ICommand {
public:
virtual ~ICommand() {}
virtual void execute() = 0;

};

#endif